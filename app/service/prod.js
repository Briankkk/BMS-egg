const Service = require('egg').Service;

class ProdService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const total = await client.query('select count(1) cnt from prod where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const prods = await client.query('select * from prod  where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:prods};
    }

    async exportFile(){
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const prods = await client.query('select PROD_CODE,PROD_NAME,PROD_TYPE_NAME,PROD_UNIT,PROD_NUM,CUSTOMER_NAME,CUSTOMER_ID from prod where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return prods;
    }

    async show() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const prod = await client.get('prod',{PROD_ID:this.ctx.params.id});
        return prod;
    }

    async create(prod) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.insert('prod',{...prod,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async createBatch(prods) {

        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.beginTransactionScope(async conn => {
            for(let prod of prods){
                await conn.insert('prod', {...prod, CUST_ID: this.ctx.session.staff.CUST_ID});
            }
            return { success: true };
        }, this.ctx);

        return result;
    }



    async update(prod) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const options = {
            where: {
                PROD_ID: this.ctx.params.id
            }
        };
        const result = await client.update('prod',{...prod,UPDATE_TIME:client.literals.now},options);
        return result;
    }

    async destroy() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        await client.delete('prod',{PROD_ID: this.ctx.params.id});
    }
}

module.exports = ProdService;