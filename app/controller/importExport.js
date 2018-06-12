'use strict';

const Controller = require('../core/base_controller');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const xlsx = require('node-xlsx');
const transEXLData = require('../utils/exportUtils').transEXLData;
const getNameData = require('../utils/exportUtils').getNameData;




class ImportExportController extends Controller {

    async exportFile(ctx) {

        const exportType = ctx.query.EXPORT_TYPE;
        delete ctx.query.EXPORT_TYPE;
        let sheetData;
        let queryData = [];
        let title=[];
        let nameData=getNameData(exportType);

        switch (exportType) {
            case 'CUSTOMER':
                queryData = await ctx.service.customer.exportFile();
                title=['客户名称','客户简称','客户编码','联系人','联系电话','联系地址'];
                break;
        }
        sheetData =transEXLData(queryData);
        sheetData.unshift(title);

        let buffer = xlsx.build([{name: nameData.sheetName, data: sheetData}]);
        let xlsxContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';  // For Excel2007 and above .xlsx files

        const xlsxFileName = nameData.fileName;
        this.ctx.set('Content-Type', xlsxContentType);
        this.ctx.set('Content-Disposition', `attachment; filename=${xlsxFileName}.xlsx`);
        this.ctx.body = buffer;
    }


    async importFile() {
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

    async uploadFile(target) {
        console.log(target)
        const obj = xlsx.parse(target);//配置excel文件的路径
        var excelObj = obj[0].data;//excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
        console.log(excelObj);
        for (var i in excelObj) {
            var value = excelObj[i];
            for (var j in value) {
                console.log(value[j]);
            }
        }
    }


}

module.exports = ImportExportController;
