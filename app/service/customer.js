const Service = require('egg').Service;

class CustomerService extends Service {
    async index() {
        const customers = await this.app.mysql.select('customer');
        return customers;
    }

    async show() {
        const customer = await this.app.mysql.get('customer',{CUSTOMER_ID:this.ctx.params.CUSTOMER_ID});
        return customer;
    }

    async create(customer) {
        const result = await this.app.mysql.insert('customer',customer);
        return result;
    }

    async update(customer) {
        const options = {
            where: {
                CUSTOMER_ID: this.ctx.params.CUSTOMER_ID
            }
        };

        const result = await this.app.mysql.update('customer',customer,options);
        return result;
    }

    async destroy() {
        const result = await this.app.mysql.delete('customer',{CUSTOMER_ID: this.ctx.params.CUSTOMER_ID});
        return result;
    }
}

module.exports = CustomerService;