const Service = require('egg').Service;

class SupplierService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const total = await client.query('select count(1) cnt from supplier where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const suppliers = await client.query('select * from supplier where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:suppliers};
    }

    async indexNoPage() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const suppliers = await client.query('select * from supplier where CUST_ID=? ',helper.convertValue());

        return suppliers;
    }

    async exportFile(){
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const suppliers = await client.query('select SUPPLIER_NAME,SUPPLIER_SHORT_NAME,SUPPLIER_CODE,LINKMAN,PHONE,ADDRESS,FAX,EMAIL from supplier where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return suppliers;
    }

    async show() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const supplier = await client.get('supplier',{SUPPLIER_ID:this.ctx.params.id});
        return supplier;
    }

    async create(supplier) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.insert('supplier',{...supplier,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async createBatch(suppliers) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const result = await client.beginTransactionScope(async conn => {
            for(let supplier of suppliers){
                await conn.insert('supplier', {...supplier, CUST_ID: this.ctx.session.staff.CUST_ID});
            }
            return { success: true };
        }, this.ctx);

        return result;
    }



    async update(supplier) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const options = {
            where: {
                SUPPLIER_ID: this.ctx.params.id
            }
        };
        const result = await client.update('supplier',{...supplier,UPDATE_TIME:client.literals.now},options);
        return result;
    }

    async destroy() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        await client.delete('supplier',{SUPPLIER_ID: this.ctx.params.id});
    }
}

module.exports = SupplierService;