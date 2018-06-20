'use strict';

const Controller = require('../core/base_controller');

class SupplierController extends Controller {
    //查询/supplier GET
    async index(ctx) {
        try {
            const suppliers = await ctx.service.supplier.index();
            this.success(suppliers);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询供应商失败")
        }

    }
    //查询单个/supplier/:id GET
    async show(ctx) {
        try {
            const supplier = await ctx.service.supplier.show();
            this.success(supplier);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询供应商失败")
        }
    }
    //新增/supplier POST
    async create(ctx) {
        try {
            const supplier = await ctx.service.supplier.create(ctx.request.body);
            this.success(supplier);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增供应商失败")
        }
    }
    //修改/supplier/:id PUT
    async update(ctx) {
        try {
            const supplier = await ctx.service.supplier.update(ctx.request.body);
            this.success(supplier);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改供应商失败")
        }
    }

    //删除/supplier/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.supplier.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除供应商失败")
        }
    }
}

module.exports = SupplierController;
