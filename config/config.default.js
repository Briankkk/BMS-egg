'use strict';
const _ = require('lodash');
module.exports = appInfo => {

    const config = {
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.tpl': 'nunjucks',
            },
        },
        mysql: {
            /*client: {
             // host
             host: '127.0.0.1',
             // 端口号
             port: '3306',
             // 用户名
             user: 'root',
             // 密码
             password: 'tianyaIBICF9',
             // 数据库名
             database: 'bms',
             },*/

            clients: {
                // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
                db_global: {
                    // host
                    host: '127.0.0.1',
                    // 端口号
                    port: '3306',
                    // 用户名
                    user: 'root',
                    // 密码
                    password: 'tianyaIBICF9',
                    // 数据库名
                    database: 'bms',
                },
                db_CZHS: {
                    // host
                    host: '127.0.0.1',
                    // 端口号
                    port: '3306',
                    // 用户名
                    user: 'root',
                    // 密码
                    password: 'tianyaIBICF9',
                    // 数据库名
                    database: 'BMS_CZHS',
                },
                // ...
            },

            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,


        },
        session: {
            key: 'EGG_SESS',
            maxAge: 2 * 3600 * 1000, // 2小时
            httpOnly: true,
            encrypt: true,
        },
        security: {
            csrf: {
                enable: false,
                //queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
                //bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
                headerName: 'x-csrf-token',// 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
                cookieName: 'csrfToken',// Cookie 中的字段名，默认为 csrfToken
            }
        },
        multipart: {
            fileExtensions: ['.xlsx'], // 增加对 .xlsx 扩展名的支持
        },
        middleware: ['robot', 'gzip', 'pagination'],
        gzip: {
            threshold: 1024, // 小于 1k 的响应体不压缩
            ignore(ctx) {
                const urlArray = ['/printPDF'];
                let flag = false;
                if (ctx.request.method === 'GET') {
                    _.forEach(urlArray, function (url) {
                        if (ctx.request.url.split('?')[0] === url || ctx.request.url.split('?')[0].indexOf(url) !== -1) {
                            flag = true;
                            return false;
                        }
                    });
                }
                return flag;
            }
        },
        robot: {
            ua: [
                /Baiduspider/i,
            ]
        },
        pagination: {
            match(ctx) {
                const urlArray = ['/customer','/cust','/supplier','/staff','/mater','/prod'];
                let flag = false;
                if (ctx.request.method === 'GET') {
                    _.forEach(urlArray, function (url) {
                        if (ctx.request.url.split('?')[0] === url || ctx.request.url.split('?')[0].indexOf(url) !== -1) {
                            flag = true;
                            return false;
                        }
                    });
                }
                return flag;
            }
        },


    };
    config.keys = "SmartBMSServer";

    return config;
};

