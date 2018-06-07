const Service = require('egg').Service;

class HomeService extends Service {
    async login() {
        //const client1 = this.app.mysql.get('db1');
        //const user = await client1.get('cust');

        const user = await this.app.mysql.get('cust');
        return user;
    }
}

module.exports = HomeService;
