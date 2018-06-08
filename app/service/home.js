const Service = require('egg').Service;

class HomeService extends Service {
    async login(userName,password) {
        const client_global = this.app.mysql.get('db_global');
        const staff = await client_global.get('staff',{ staff_code: userName,password:password,state:'A'});

        //const staff = await this.app.mysql.get('staff',{ staff_code: userName,password:password,state:'A'});
        return staff;
    }
}

module.exports = HomeService;
