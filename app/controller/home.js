'use strict';

const Controller = require('../core/base_controller');

class HomeController extends Controller {
    async index() {
        await this.ctx.render('index.html');
    }

    async currentUser(ctx) {
        if (ctx.session.staff) {
            this.success(ctx.session.staff);
        }
        else {
            this.fail("用户没有登录")
        }
    }

    async login(ctx) {

        //ctx.logger.debug('debug info');
        //ctx.logger.info('some request data: %j', this.ctx.request.body);
        //ctx.logger.warn('WARNNING!!!!');
        //console.log(ctx.session.staff)
        /*const loginRule={
            title: { type: 'string',required:false },
            content: { type: 'string',required:false },
        };*/

        try {
            //this.ctx.validate(loginRule);
            const {userName, password} = ctx.request.body;
            const staff = await ctx.service.home.login(userName,password);
            if (staff) {
                ctx.session.staff=staff;
                this.success(staff);
            }
            else {
                this.fail("登录失败,请检查用户名或者密码");
            }

        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("登录失败,请检查用户名或者密码")
        }
    }

    async logout(ctx) {

        try {
            ctx.session = null;
            this.success({});
        }
        catch (e) {
            ctx.logger.error(new Error(e));
            this.fail("登录失败,请检查用户名或者密码")
        }
    }
}

module.exports = HomeController;
