'use strict';

const Controller = require('../core/base_controller');

class CustController extends Controller {
    //查询/cust GET
    async index(ctx) {
        try {
            const custs = await ctx.service.cust.index();
            this.success(custs);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询租户失败")
        }

    }
    //查询单个/cust/:id GET
    async show(ctx) {
        try {
            const cust = await ctx.service.cust.show();
            this.success(cust);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询租户失败")
        }
    }
    //新增/cust POST
    async create(ctx) {
        try {
            const cust = await ctx.service.cust.create(ctx.request.body);
            this.success(cust);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增租户失败")
        }
    }
    //修改/cust/:id PUT
    async update(ctx) {
        try {
            const cust = await ctx.service.cust.update(ctx.request.body);
            this.success(cust);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改租户失败")
        }
    }

    //删除/cust/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.cust.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除租户失败")
        }
    }
}

module.exports = CustController;
