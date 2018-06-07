'use strict';

module.exports = appInfo => {

    const config = {
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.tpl': 'nunjucks',
            },
        },
        mysql:{
            client: {
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

            /*clients: {
                // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
                db1: {
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
                db2: {
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
                // ...
            },*/

            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,


        },

        security : {
            csrf: {
                enable: true,
                ignoreJSON: true,
                queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
                bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
                headerName: 'x-csrf-token',// 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
                cookieName: 'csrfToken',// Cookie 中的字段名，默认为 csrfToken
            }
        }

    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1528262393100_3897';

    // add your config here
    config.middleware = [];

    return config;
};

