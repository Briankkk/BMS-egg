const Service = require('egg').Service;

class CustomerService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const total = await client_global.query('select count(1) cnt from customer where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const customers = await client_global.query('select * from customer where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:customers};
    }

    async exportFile(){
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const customers = await client_global.query('select CUSTOMER_NAME,CUSTOMER_SHORT_NAME,CUSTOMER_CODE,LINKMAN,PHONE,ADDRESS from customer where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return customers;
    }

    async show() {
        const client_global = this.app.mysql.get('db_global');
        const customer = await client_global.get('customer',{CUSTOMER_ID:this.ctx.params.id});
        return customer;
    }

    async create(customer) {
        const client_global = this.app.mysql.get('db_global');
        const result = await client_global.insert('customer',{...customer,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async update(customer) {
        const client_global = this.app.mysql.get('db_global');
        const options = {
            where: {
                CUSTOMER_ID: this.ctx.params.id
            }
        };
        const result = await client_global.update('customer',{...customer,UPDATE_TIME:client_global.literals.now},options);
        return result;
    }

    async destroy() {
        const client_global = this.app.mysql.get('db_global');
        await client_global.delete('customer',{CUSTOMER_ID: this.ctx.params.id});
    }
}

module.exports = CustomerService;