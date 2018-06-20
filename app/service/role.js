const Service = require('egg').Service;

class RoleService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const roles = await client.select('staff_role', {
            where: { state: 'A'}
        });

        return roles;
    }

}

module.exports = RoleService;