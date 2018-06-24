'use strict';

const Controller = require('../core/base_controller');

class ProdController extends Controller {
    //查询/prod GET
    async index(ctx) {
        try {
            const prods = await ctx.service.prod.index();
            this.success(prods);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询产品失败")
        }

    }
    //查询单个/prod/:id GET
    async show(ctx) {
        try {
            const prod = await ctx.service.prod.show();
            this.success(prod);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询产品失败")
        }
    }
    //新增/prod POST
    async create(ctx) {
        try {
            const prod = await ctx.service.prod.create(ctx.request.body);
            this.success(prod);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增产品失败")
        }
    }
    //修改/prod/:id PUT
    async update(ctx) {
        try {
            const prod = await ctx.service.prod.update(ctx.request.body);
            this.success(prod);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改产品失败")
        }
    }

    //删除/prod/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.prod.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除产品失败")
        }
    }
}

module.exports = ProdController;
