'use strict';

const Controller = require('../core/base_controller');

class HandlerLogController extends Controller {
    //查询/handlerLog GET
    async index(ctx) {
        try {
            const logs = await ctx.service.handlerLog.index();
            this.success(logs);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询操作日志失败")
        }

    }
    //查询单个/handlerLog/:id GET
    async show(ctx) {
        try {
            const log = await ctx.service.handlerLog.show();
            this.success(log);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询操作日志失败")
        }
    }


}

module.exports = HandlerLogController;
