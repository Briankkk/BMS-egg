'use strict';

const Controller = require('../core/base_controller');
const crypto = require('crypto');
const config = require('../../config/config.default');

class StaffController extends Controller {
    //查询/staff GET
    async index(ctx) {
        try {
            const staffs = await ctx.service.staff.index();
            this.success(staffs);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询员工失败")
        }

    }
    //查询单个/staff/:id GET
    async show(ctx) {
        try {
            const staff = await ctx.service.staff.show();
            this.success(staff);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询员工失败")
        }
    }
    //新增/staff POST
    async create(ctx) {
        try {
            const staffAdd = ctx.request.body;
            staffAdd.PASSWORD = crypto.createHmac('sha256', config().keys)
                .update(staffAdd.PASSWORD)
                .digest('hex');
            const staff = await ctx.service.staff.create(staffAdd);
            this.success(staff);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("新增员工失败")
        }
    }
    //修改/staff/:id PUT
    async update(ctx) {
        try {
            const staffMod = ctx.request.body;
            staffMod.PASSWORD = crypto.createHmac('sha256', config().keys)
                .update(staffMod.PASSWORD)
                .digest('hex')
            const staff = await ctx.service.staff.update(staffMod);
            this.success(staff);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("修改员工失败")
        }
    }

    //删除/staff/:id DELETE
    async destroy(ctx) {
        try {
            await ctx.service.staff.destroy();
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("删除员工失败")
        }
    }
}

module.exports = StaffController;
