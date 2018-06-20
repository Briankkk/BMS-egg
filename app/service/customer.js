const Service = require('egg').Service;

class CustomerService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const total = await client.query('select count(1) cnt from customer where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const customers = await client.query('select * from customer where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:customers};
    }

    async exportFile(){

        const helper = this.ctx.helper;
        const client = helper.getClient();

        const customers = await client.query('select CUSTOMER_NAME,CUSTOMER_SHORT_NAME,CUSTOMER_CODE,LINKMAN,PHONE,ADDRESS from customer where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return customers;
    }

    async show() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const customer = await client.get('customer',{CUSTOMER_ID:this.ctx.params.id});
        return customer;
    }

    async create(customer) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.insert('customer',{...customer,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async createBatch(customers) {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const result = await client.beginTransactionScope(async conn => {
            for(let customer of customers){
                await conn.insert('customer', {...customer, CUST_ID: this.ctx.session.staff.CUST_ID});
            }
            return { success: true };
        }, this.ctx);

        return result;
    }



    async update(customer) {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const options = {
            where: {
                CUSTOMER_ID: this.ctx.params.id
            }
        };
        const result = await client.update('customer',{...customer,UPDATE_TIME:client.literals.now},options);
        return result;
    }

    async destroy() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        await client.delete('customer',{CUSTOMER_ID: this.ctx.params.id});
    }
}

module.exports = CustomerService;