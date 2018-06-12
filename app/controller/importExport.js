'use strict';

const Controller = require('../core/base_controller');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const xlsx = require('node-xlsx');
const transEXLData = require('../utils/exportUtils').transEXLData;
const transObjData = require('../utils/exportUtils').transObjData;
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


    async uploadFile(ctx) {
        const stream = await ctx.getFileStream();

        const fileName = encodeURIComponent(stream.filename);
        const target = path.join(this.config.baseDir, 'app/public', fileName);
        const writeStream = fs.createWriteStream(target);

        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
        ctx.body = fileName;
    }

    async importFile(ctx) {
        const {fileType, fileName} = ctx.request.body;
        let result;
        const obj = xlsx.parse(path.join(this.config.baseDir, 'app/public', fileName));//配置excel文件的路径
        var excelData = obj[0].data;//excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
        excelData.shift();

        const insertData =transObjData(excelData,fileType);
        try {
            switch (fileType) {
                case 'CUSTOMER':
                    result = await ctx.service.customer.createBatch(insertData);
                    break;
            }
            this.success(result);
        }catch(e){
            ctx.logger.error(new Error(e));
            this.fail("导入客户失败")
        }
    }


}

module.exports = ImportExportController;
