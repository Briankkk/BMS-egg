'use strict';

const Controller = require('../core/base_controller');


class MaterTypeController extends Controller {
    //查询/materType GET
    async index(ctx) {
        try {
            const materTypes = await ctx.service.materType.index();
            this.success(materTypes);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询原料类型失败")
        }

    }

}

module.exports = MaterTypeController;
