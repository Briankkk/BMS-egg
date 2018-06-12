'use strict';

const Controller = require('../core/base_controller');

class CustomerController extends Controller {
    //查询/customer GET
    async index(ctx) {
        try {
            const customers = await ctx.service.customer.index();
            this.success(customers);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询客户失败")
        }

    }
    //查询单个/customer/:id GET
    async show(ctx) {
        try {
            const customer = await ctx.service.customer.show();
            this.success(customer);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询客户失败")
        }
    }
    //新增/customer POST
    async create(ctx) {
        try {
            const customer = await ctx.service.customer.create(ctx.request.body);
            this.success(customer);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增客户失败")
        }
    }
    //修改/customer/:id PUT
    async update(ctx) {
        try {
            const customer = await ctx.service.customer.update(ctx.request.body);
            this.success(customer);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改客户失败")
        }
    }

    //删除/customer/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.customer.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除客户失败")
        }
    }
}

module.exports = CustomerController;
