'use strict';

const Controller = require('../core/base_controller');

class PurchaseController extends Controller {
    //查询/purchase GET
    async index(ctx) {
        try {
            const result = await ctx.service.purchase.index();
            this.success(result);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询采购单失败")
        }

    }


    //查询单个/purchase/:id GET
    async show(ctx) {
        try {
            const result = await ctx.service.purchase.show();
            this.success(result);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询采购单失败")
        }
    }
    //新增/purchase POST
    async create(ctx) {
        try {
            const result = await ctx.service.purchase.create(ctx.request.body.purchase,ctx.request.body.maters);
            this.success(result);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增采购单失败")
        }
    }
    //修改/purchase/:id PUT
    async update(ctx) {
        try {
            const result = await ctx.service.purchase.update(ctx.request.body);
            this.success(result);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改采购单失败")
        }
    }

    //删除/purchase/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.purchase.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除采购单失败")
        }
    }
}

module.exports = PurchaseController;
