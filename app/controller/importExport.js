'use strict';

const Controller = require('../core/base_controller');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const xlsx = require('node-xlsx');





class ImportExportController extends Controller {

    async exportFile(){

        const data = [[1, 2, 3], [true, false, null], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];

        let buffer = xlsx.build([{name: 'sheet表名', data: data}]);
        let xlsxContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';  // For Excel2007 and above .xlsx files

        const xlsxFileName='myfile';
        this.ctx.set('Content-Type',xlsxContentType)
        this.ctx.set('Content-Disposition', `attachment; filename=${xlsxFileName}.xlsx`);
        this.ctx.body = buffer;
    }


    async uploadFile() {
        const stream = await this.ctx.getFileStream();

        const filename = encodeURIComponent(stream.filename);
        const target = path.join(this.config.baseDir, 'app/public', filename);
        const writeStream = fs.createWriteStream(target);

        this.ctx.service.customer.upload(target);


        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
        this.ctx.redirect('/public/' + filename);
    }

    async uploadFile(target){
        console.log(target)
        const obj = xlsx.parse(target);//配置excel文件的路径
        var excelObj=obj[0].data;//excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
        console.log(excelObj);
        for(var i in excelObj){
            var value=excelObj[i];
            for(var j in value){
                console.log(value[j]);
            }
        }
    }


}

module.exports = ImportExportController;
