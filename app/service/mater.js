const Service = require('egg').Service;

class MaterService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const total = await client_global.query('select count(1) cnt from mater where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const maters = await client_global.query('select * from mater  where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:maters};
    }

    async exportFile(){
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const maters = await client_global.query('select MATER_CODE,MATER_NAME,MATER_TYPE,MATER_UNIT,MATER_NUM,MATER_REQ_NUM,MATER_HINT_MIN,MATER_ATTR,MATER_ATTR_EXTEND from mater where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return maters;
    }

    async show() {
        const client_global = this.app.mysql.get('db_global');
        const mater = await client_global.get('mater',{MATER_ID:this.ctx.params.id});
        return mater;
    }

    async create(mater) {
        const client_global = this.app.mysql.get('db_global');
        const result = await client_global.insert('mater',{...mater,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async createBatch(maters) {

        const result = await this.app.mysql.get('db_global').beginTransactionScope(async conn => {
            for(let mater of maters){
                await conn.insert('mater', {...mater, CUST_ID: this.ctx.session.staff.CUST_ID});
            }
            return { success: true };
        }, this.ctx);

        return result;
    }



    async update(mater) {
        const client_global = this.app.mysql.get('db_global');
        const options = {
            where: {
                MATER_ID: this.ctx.params.id
            }
        };
        const result = await client_global.update('mater',{...mater,UPDATE_TIME:client_global.literals.now},options);
        return result;
    }

    async destroy() {
        const client_global = this.app.mysql.get('db_global');
        await client_global.delete('mater',{MATER_ID: this.ctx.params.id});
    }
}

module.exports = MaterService;