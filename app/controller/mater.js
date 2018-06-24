'use strict';

const Controller = require('../core/base_controller');

class MaterController extends Controller {
    //查询/mater GET
    async index(ctx) {
        try {
            const maters = await ctx.service.mater.index();
            this.success(maters);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询原料失败")
        }

    }
    //查询单个/mater/:id GET
    async show(ctx) {
        try {
            const mater = await ctx.service.mater.show();
            this.success(mater);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询原料失败")
        }
    }
    //新增/mater POST
    async create(ctx) {
        try {
            const mater = await ctx.service.mater.create(ctx.request.body);
            this.success(mater);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增原料失败")
        }
    }
    //修改/mater/:id PUT
    async update(ctx) {
        try {
            const mater = await ctx.service.mater.update(ctx.request.body);
            this.success(mater);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改原料失败")
        }
    }

    //删除/mater/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.mater.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除原料失败")
        }
    }
}

module.exports = MaterController;
