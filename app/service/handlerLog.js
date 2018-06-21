const Service = require('egg').Service;

class HandlerLogService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client_global = this.app.mysql.get('db_global');
        const total = await client_global.query(`select count(1) cnt from handler_log where 1=1 `+helper.convertWhere(),helper.convertValueWithOutCust());
        const logs = await client_global.query(`select * from handler_log where 1=1 `+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValueWithOutCust());
        return {total: total[0].cnt, list: logs};
    }


    async show() {
        const client_global = this.app.mysql.get('db_global');
        const cust = await client_global.get('handler_log', {HANDLER_LOG_ID: this.ctx.params.id});
        return cust;
    }

    async create(log) {
        try {
            await this.app.mysql.get('db_global').insert('handler_log', log);
        } catch (err) {
            throw err;
        }
    }


}

module.exports = HandlerLogService;