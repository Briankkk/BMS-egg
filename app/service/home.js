const Service = require('egg').Service;

class HomeService extends Service {
    async login(userName,password) {
        //const client1 = this.app.mysql.get('db1');
        //const user = await client1.get('cust');

        const staff = await this.app.mysql.get('staff',{ staff_code: userName,password:password,state:'A'});
        return staff;
    }
}

module.exports = HomeService;
