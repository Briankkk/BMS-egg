const Service = require('egg').Service;

class CustomerService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const total = await client_global.query(`select count(1) cnt from cust where state='A'`);
        const custs = await client_global.query(`select * from cust where state='A'`);

        return {total: total[0].cnt, list: custs};
    }


    async show() {
        const client_global = this.app.mysql.get('db_global');
        const cust = await client_global.get('cust', {CUST_ID: this.ctx.params.id});
        return cust;
    }

    async create(cust) {

        const connGlobal = await this.app.mysql.get('db_global').beginTransaction(); // 初始化事务
        //const connCust = await this.app.mysql.get('db_'+cust.CUST_CODE).beginTransaction(); // 初始化事务

        try {
            const custResule = await connGlobal.insert('cust', cust);  // 新增客户
            cust.CUST_ID = custResule.insertId;

            await connGlobal.insert('staff', {
                CUST_ID: cust.CUST_ID,
                STAFF_NAME: 'Admin',
                STAFF_CODE: cust.CUST_CODE + '_admin',
                PASSWORD: '09472b87a00588ce898737b10fe1d86fd415097c436cf691ea3db2d42460384c',
                STAFF_ROLE: 'admin'
            });  // 新增客户下admin
            await connGlobal.commit(); // 提交事务

            try {
                await this.app.mysql.get('db_' + cust.CUST_CODE).insert('cust', cust);//同步cust信息
            }catch(err){
                throw err;
            }

            //await connCust.insert('cust', cust);
            /*await connCust.insert('staff', {
             //STAFF_ID:staffResule.insertId,
             CUST_ID: cust.CUST_ID,
             STAFF_NAME: 'Admin',
             STAFF_CODE: cust.CUST_CODE + '_admin',
             PASSWORD: '09472b87a00588ce898737b10fe1d86fd415097c436cf691ea3db2d42460384c',
             STAFF_ROLE: 'admin'
             });
             await connCust.commit();*/


        } catch (err) {
            await connGlobal.rollback();
            throw err;
        }


    }


    async update(cust) {
        const client_global = this.app.mysql.get('db_global');
        const client_cust = this.app.mysql.get('db_' + cust.CUST_CODE);
        const options = {
            where: {
                CUST_ID: this.ctx.params.id
            }
        };
        const result = await client_global.update('cust', {...cust, UPDATE_TIME: client_global.literals.now}, options);
        await client_cust.update('cust', {...cust, UPDATE_TIME: client_global.literals.now}, options);
        return result;
    }

    async destroy() {
        const client_global = this.app.mysql.get('db_global');
        await client_global.delete('cust', {CUST_ID: this.ctx.params.id});
    }
}

module.exports = CustomerService;