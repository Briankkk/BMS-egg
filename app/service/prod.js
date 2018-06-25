const Service = require('egg').Service;
const transList2Map = require('../utils/collectionUtils').transList2Map;

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
        const prods = await client.query('select PROD_NAME,PROD_CODE,PROD_TYPE_NAME,CUSTOMER_NAME,PROD_UNIT,PROD_NUM from prod where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
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
        const prodTypes = await client.query(`select PROD_TYPE_ID,PROD_TYPE_NAME from prod_type where state='A' and PARENT_TYPE_ID is not null and cust_id=?`,[this.ctx.session.staff.CUST_ID]);
        const mapType = transList2Map(prodTypes,'PROD_TYPE_ID','PROD_TYPE_NAME');

        const customers = await client.query(`select CUSTOMER_ID,CUSTOMER_NAME from customer where state='A' and cust_id=?`,[this.ctx.session.staff.CUST_ID]);
        const mapCustomers = transList2Map(customers,'CUSTOMER_ID','CUSTOMER_NAME');

        const result = await client.beginTransactionScope(async conn => {
            for(let prod of prods){
                await conn.insert('prod', {...prod, PROD_TYPE_ID:mapType.get(prod.PROD_TYPE_NAME),CUSTOMER_ID:mapCustomers.get(prod.CUSTOMER_NAME),CUST_ID: this.ctx.session.staff.CUST_ID});
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