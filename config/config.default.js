'use strict';

module.exports = appInfo => {

    const config = {
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.tpl': 'nunjucks',
            },
        },
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1528262393100_3897';

    // add your config here
    config.middleware = [];

    return config;
};
