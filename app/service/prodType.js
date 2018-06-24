const Service = require('egg').Service;

class ProdTypeService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const prodTypes = await client.query(`select * from prod_type where state='A' and PARENT_TYPE_ID is not null and cust_id=?`,[this.ctx.session.staff.CUST_ID]);

        return prodTypes;
    }

}

module.exports = ProdTypeService;