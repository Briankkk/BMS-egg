const Service = require('egg').Service;

class MaterService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const total = await client.query('select count(1) cnt from mater where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const maters = await client.query('select * from mater  where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:maters};
    }

    async exportFile(){
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const maters = await client.query('select MATER_CODE,MATER_NAME,MATER_TYPE,MATER_UNIT,MATER_NUM,MATER_REQ_NUM,MATER_HINT_MIN,MATER_ATTR,MATER_ATTR_EXTEND from mater where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return maters;
    }

    async show() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const mater = await client.get('mater',{MATER_ID:this.ctx.params.id});
        return mater;
    }

    async create(mater) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.insert('mater',{...mater,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async createBatch(maters) {

        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.beginTransactionScope(async conn => {
            for(let mater of maters){
                await conn.insert('mater', {...mater, CUST_ID: this.ctx.session.staff.CUST_ID});
            }
            return { success: true };
        }, this.ctx);

        return result;
    }



    async update(mater) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const options = {
            where: {
                MATER_ID: this.ctx.params.id
            }
        };
        const result = await client.update('mater',{...mater,UPDATE_TIME:client.literals.now},options);
        return result;
    }

    async destroy() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        await client.delete('mater',{MATER_ID: this.ctx.params.id});
    }
}

module.exports = MaterService;