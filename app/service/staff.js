const Service = require('egg').Service;

class StaffService extends Service {
    async index() {
        const client_global = this.app.mysql.get('db_global');
        const helper = this.ctx.helper;
        const total = await client_global.query('select count(1) cnt from staff where CUST_ID=?'+helper.convertWhere(),helper.convertValue());
        const staffs = await client_global.query('select * from staff where CUST_ID=? '+helper.convertWhere()+ helper.convertOrder()+helper.convertLimit(),helper.convertValue());

        return {total:total[0].cnt,list:staffs};
    }

    async show() {
        const client_global = this.app.mysql.get('db_global');
        const staff = await client_global.get('staff',{STAFF_ID:this.ctx.params.id});
        return staff;
    }

    async create(staff) {
        const client_global = this.app.mysql.get('db_global');
        const result = await client_global.insert('staff',{...staff,CUST_ID:this.ctx.session.staff.CUST_ID});
        return result;
    }

    async update(staff) {
        const client_global = this.app.mysql.get('db_global');
        const options = {
            where: {
                STAFF_ID: this.ctx.params.id
            }
        };
        const result = await client_global.update('staff',{...staff,UPDATE_TIME:client_global.literals.now},options);
        return result;
    }

    async updateAuthPass(staffId){
        const client_global = this.app.mysql.get('db_global');
        const options = {
            where: {
                STAFF_ID: staffId
            }
        };
        const result = await client_global.update('staff',{IS_AUTH_PASS:'1',UPDATE_TIME:client_global.literals.now},options);
        return result;
    }

    async destroy() {
        const client_global = this.app.mysql.get('db_global');
        await client_global.delete('staff',{STAFF_ID: this.ctx.params.id});
    }
}

module.exports = StaffService;