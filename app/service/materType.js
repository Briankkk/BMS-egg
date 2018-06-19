const Service = require('egg').Service;

class MaterTypeService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const roles = await client_global.query(`select * from mater_type where state='A' and PARENT_TYPE_ID is not null and cust_id=?`,[this.ctx.session.staff.CUST_ID]);

        return roles;
    }

}

module.exports = MaterTypeService;