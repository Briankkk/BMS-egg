const Service = require('egg').Service;

class MaterTypeService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const materTypes = await client.query(`select * from mater_type where state='A' and PARENT_TYPE_ID is not null and cust_id=?`,[this.ctx.session.staff.CUST_ID]);

        return materTypes;
    }

}

module.exports = MaterTypeService;