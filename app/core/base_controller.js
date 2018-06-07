const { Controller } = require('egg');
class BaseController extends Controller {

    success(data) {
        this.ctx.body = {
            code:0,
            message: 'success',
            data,
        };
    }

    fail(msg) {
        this.ctx.body = {
            code:-1,
            message: msg
        };
    }
}
module.exports = BaseController;