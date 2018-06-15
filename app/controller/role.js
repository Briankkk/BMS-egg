'use strict';

const Controller = require('../core/base_controller');


class RoleController extends Controller {
    //查询/role GET
    async index(ctx) {
        try {
            const roles = await ctx.service.role.index();
            this.success(roles);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询角色失败")
        }

    }

}

module.exports = RoleController;
