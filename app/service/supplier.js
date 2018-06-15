const Service = require('egg').Service;

class SupplierService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const total = await client_global.query('select count(1) cnt from supplier where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const suppliers = await client_global.query('select * from supplier where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:suppliers};
    }

    async exportFile(){
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const suppliers = await client_global.query('select SUPPLIER_NAME,SUPPLIER_SHORT_NAME,SUPPLIER_CODE,LINKMAN,PHONE,ADDRESS,FAX,EMAIL from supplier where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder(),helper.convertValue());
        return suppliers;
    }

    async show() {
        const client_global = this.app.mysql.get('db_global');
        const supplier = await client_global.get('supplier',{SUPPLIER_ID:this.ctx.params.id});
        return supplier;
    }

    async create(supplier) {
        const client_global = this.app.mysql.get('db_global');
        const result = await client_global.insert('supplier',{...supplier,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async createBatch(suppliers) {

        const result = await this.app.mysql.get('db_global').beginTransactionScope(async conn => {
            for(let supplier of suppliers){
                await conn.insert('supplier', {...supplier, CUST_ID: this.ctx.session.staff.CUST_ID});
            }
            return { success: true };
        }, this.ctx);

        return result;
    }



    async update(supplier) {
        const client_global = this.app.mysql.get('db_global');
        const options = {
            where: {
                SUPPLIER_ID: this.ctx.params.id
            }
        };
        const result = await client_global.update('supplier',{...supplier,UPDATE_TIME:client_global.literals.now},options);
        return result;
    }

    async destroy() {
        const client_global = this.app.mysql.get('db_global');
        await client_global.delete('supplier',{SUPPLIER_ID: this.ctx.params.id});
    }
}

module.exports = SupplierService;