'use strict';

const Controller = require('../core/base_controller');


class ProdTypeController extends Controller {
    //查询/prodType GET
    async index(ctx) {
        try {
            const prodTypes = await ctx.service.prodType.index();
            this.success(prodTypes);
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("查询产品类型失败")
        }

    }

}

module.exports = ProdTypeController;
