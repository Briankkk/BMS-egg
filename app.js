
module.exports = app => {
    app.beforeStart(async function () {
        app.logger.info('-------Welcome BMS Server-------');
        const eggResult = await app.curl('https://registry.npm.taobao.org/egg/latest', {
            dataType: 'json',
        });
        const dvaResult = await app.curl('https://registry.npm.taobao.org/dva/latest', {
            dataType: 'json',
        });
        app.logger.info('egg latest version: %s', eggResult.data.version);
        app.logger.info('dva latest version: %s', dvaResult.data.version);

    });

    app.validator.addRule('json', (rule, value) => {
        try {
            JSON.parse(value);
        } catch (err) {
            return 'must be json string';
        }
    });

    app.once('server', server => {
        //console.log("server")
    });
    app.on('error', (err, ctx) => {
        //console.log("error")
    });
    app.on('request', ctx => {
        //console.log("request")
    });
    app.on('response', ctx => {
        //console.log("response")
    });
};