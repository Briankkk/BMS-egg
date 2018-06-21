'use strict';

const Controller = require('../core/base_controller')
const crypto = require('crypto');
const config = require('../../config/config.default');
const judgeStaffAuth = require('../utils/loginUtils').judgeStaffAuth;
const uuidv1 = require('uuid/v1');


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
        ctx.logger.debug('begin to login');
        /*const loginRule={
            title: { type: 'string',required:false },
            content: { type: 'string',required:false },
        };*/

        try {
            //this.ctx.validate(loginRule);
            const {userName, password,authCodeC,authCodeS} = ctx.request.body;

            ctx.logger.info('userName , password,authCodeC,authCodeS', userName,password,authCodeC,authCodeS);


            const staff = await ctx.service.home.login(userName,crypto.createHmac('sha256', config().keys)
                .update(password)
                .digest('hex'));
            if (staff&&staff[0]) {
                ctx.logger.info('staff[0]', staff[0]);
                if(judgeStaffAuth(staff[0],authCodeC,authCodeS)) {
                    try {
                        await ctx.service.staff.updateAuthPass(staff[0].STAFF_ID);

                        ctx.session.staff = staff[0];
                        ctx.rotateCsrfSecret();// 调用 rotateCsrfSecret 刷新用户的 CSRF token
                        this.success(staff[0]);
                    }catch(e){
                        ctx.logger.error(new Error(e));
                        this.fail("登录失败,请检查用户名或者密码")
                    }
                }else{
                    await ctx.service.authRequest.existReqHandler(staff[0].CUST_ID,staff[0].STAFF_ID);
                    const req={STAFF_ID:staff[0].STAFF_ID,CUST_ID:staff[0].CUST_ID, AUTH_CODE_C:authCodeC,AUTH_CODE_S:uuidv1()};
                    await ctx.service.authRequest.create(req);
                    this.fail("已向管理员申请授权登录,请授权通过后再次登录");
                }
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
