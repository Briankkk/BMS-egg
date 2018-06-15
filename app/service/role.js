const Service = require('egg').Service;

class RoleService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const roles = await client_global.select('staff_role', {
            where: { state: 'A'}
        });

        return roles;
    }

}

module.exports = RoleService;