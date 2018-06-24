const Service = require('egg').Service;
const transList2Map = require('../utils/collectionUtils').transList2Map;

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
        const maters = await client.query('select MATER_NAME,MATER_CODE,MATER_TYPE_NAME,MATER_UNIT,MATER_NUM,MATER_HINT_MIN from mater where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
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
        const materTypes = await client.query(`select MATER_TYPE_ID,MATER_TYPE_NAME from mater_type where state='A' and PARENT_TYPE_ID is not null and cust_id=?`,[this.ctx.session.staff.CUST_ID]);
        const map = transList2Map(materTypes,'MATER_TYPE_ID','MATER_TYPE_NAME');
        const result = await client.beginTransactionScope(async conn => {
            for(let mater of maters){
                await conn.insert('mater', {...mater, MATER_TYPE_ID:map.get(mater.MATER_TYPE_NAME),CUST_ID: this.ctx.session.staff.CUST_ID});
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