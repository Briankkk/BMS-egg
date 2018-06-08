const Service = require('egg').Service;

class CustomerService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        //console.log(this.ctx.query.PAGE_SIZE)
        //console.log(this.ctx.query.PAGE_INDEX)
        const PAGE_SIZE = parseInt(this.ctx.query.PAGE_SIZE);
        const PAGE_INDEX = parseInt(this.ctx.query.PAGE_INDEX);
        const customers = await client_global.select('customer',{
            //CUST_ID:this.ctx.session.staff.CUST_ID,
            where: { CUST_ID: this.ctx.session.staff.CUST_ID},
            //columns: ['author', 'title'], // 要查询的表字段
            //orders: [['created_at','desc'], ['id','desc']], // 排序方式
            limit: PAGE_SIZE ,
            offset: (PAGE_INDEX - 1) * PAGE_SIZE,
        });
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