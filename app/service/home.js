const Service = require('egg').Service;

class HomeService extends Service {
    async login(userName,password) {
        const client_global = this.app.mysql.get('db_global');
        const staff = await client_global.query('select a.STAFF_ID as STAFF_ID, a.STAFF_NAME as STAFF_NAME,a.STAFF_CODE as STAFF_CODE,a.STAFF_ROLE as STAFF_ROLE,a.CUST_ID as CUST_ID,a.auth_code_c as AUTH_CODE_C,a.auth_code_s as AUTH_CODE_S,a.is_auth_pass as IS_AUTH_PASS,b.CUST_CODE as CUST_CODE from staff a join cust b on a.cust_id=b.cust_id where a.staff_code=? and a.password=? and a.state=?',[userName,password,'A']);

        //const staff = await this.app.mysql.get('staff',{ staff_code: userName,password:password,state:'A'});
        return staff;
    }
}

module.exports = HomeService;
