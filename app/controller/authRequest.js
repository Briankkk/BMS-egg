'use strict';

const Controller = require('../core/base_controller');


class AuthRequestController extends Controller {
    //查询/authRequest GET
    async index(ctx) {
        try {
            const reqs= await ctx.service.authRequest.index();
            this.success(reqs);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询审核请求失败")
        }

    }

    //同意/authRequest/approve/:id PUT
    async approve(ctx) {
        try {

            const req = await ctx.service.authRequest.approve();
            this.success(req);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("操作失败")
        }
    }

    //拒绝/authRequest/reject/:id PUT
    async reject(ctx) {
        try {
            const req = await ctx.service.authRequest.reject();
            this.success(req);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("操作失败")
        }
    }
}

module.exports = AuthRequestController;
