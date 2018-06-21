const Service = require('egg').Service;

class AuthRequestService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const total = await client_global.query(`select count(1) cnt from AUTH_REQ where CUST_ID=? and state='A'`,[this.ctx.session.staff.CUST_ID]);
        const reqs = await client_global.query(`select a.AUTH_REQ_ID as AUTH_REQ_ID,a.staff_id as STAFF_ID,b.staff_code as STAFF_CODE,b.staff_name  as STAFF_NAME from AUTH_REQ a join staff b on a.staff_id=b.staff_id where a.CUST_ID=? and a.state='A'` +helper.convertLimit(),[this.ctx.session.staff.CUST_ID]);

        return {total:total[0].cnt,list:reqs};
    }


    async existReqHandler(custId,staffId) {
        const client_global = this.app.mysql.get('db_global');

        const reqs = await client_global.query(`select * from AUTH_REQ  where CUST_ID=? and STAFF_ID=? and state='A'` ,[custId,staffId]);

        for(let req of reqs){
            const options = {
                where: {
                    AUTH_REQ_ID: req.AUTH_REQ_ID
                }
            };
            await client_global.update('AUTH_REQ',{STATE:'F',UPDATE_TIME:client_global.literals.now},options);
        }
    }


    async create(req) {
        const client_global = this.app.mysql.get('db_global');
        const result = await client_global.insert('AUTH_REQ',req);
        return result;
    }

    async approve() {
        const connGlobal = await this.app.mysql.get('db_global').beginTransaction();
        try {
            const options = {
                where: {
                    AUTH_REQ_ID: this.ctx.params.id
                }
            };
            await connGlobal.update('AUTH_REQ',{STATE:'S',UPDATE_TIME:connGlobal.literals.now},options);
            const authInfo = await connGlobal.get('AUTH_REQ',{ AUTH_REQ_ID:this.ctx.params.id });
            await connGlobal.update('staff',{AUTH_CODE_C:authInfo.AUTH_CODE_C,AUTH_CODE_S:authInfo.AUTH_CODE_S,IS_AUTH_PASS:'0',UPDATE_TIME:connGlobal.literals.now},{where: {STAFF_ID: authInfo.STAFF_ID}});
            await connGlobal.commit(); // 提交事务
        }catch (err) {
            await connGlobal.rollback();
            throw err;
        }


    }

    async reject() {
        const client_global = this.app.mysql.get('db_global');
        const options = {
            where: {
                AUTH_REQ_ID: this.ctx.params.id
            }
        };
        const result = await client_global.update('AUTH_REQ',{STATE:'F',UPDATE_TIME:client_global.literals.now},options);
        return result;
    }


}

module.exports = AuthRequestService;