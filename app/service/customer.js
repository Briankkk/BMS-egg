const Service = require('egg').Service;

class CustomerService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const customers = await client_global.select('customer',{CUST_ID:this.ctx.session.staff.CUST_ID});
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