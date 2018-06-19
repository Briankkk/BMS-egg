'use strict';

const Controller = require('../core/base_controller')
const crypto = require('crypto');
const config = require('../../config/config.default');


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


            const staff = await ctx.service.home.login(userName,crypto.createHmac('sha256', config().keys)
                .update(password)
                .digest('hex'));
            if (staff&&staff[0]) {
                ctx.session.staff=staff[0];
                // 调用 rotateCsrfSecret 刷新用户的 CSRF token
                ctx.rotateCsrfSecret();
                this.success(staff[0]);
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
