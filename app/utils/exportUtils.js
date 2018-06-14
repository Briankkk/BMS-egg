const _ = require('lodash');

function obj2List(obj) {
    return _.values(obj)
}
function transEXLData(data) {
    return _.map(data, obj2List);
}

function transObjData(data, type) {
    let objData = {};
    switch (type) {
        case 'CUSTOMER':
            objData = _.map(data, _transCustomerData);
            break;
    }
    return objData;
}

function _transCustomerData(list) {
    const obj = {};
    if (list[0]) {
        obj.CUSTOMER_NAME = list[0];
    }
    if (list[1]) {
        obj.CUSTOMER_SHORT_NAME = list[1];
    }
    if (list[2]) {
        obj.CUSTOMER_CODE = list[2];
    }
    if (list[3]) {
        obj.LINKMAN = list[3];
    }
    if (list[4]) {
        obj.PHONE = list[4];
    }
    if (list[5]) {
        obj.ADDRESS = list[5];
    }
    return obj;
}

function getNameData(type) {
    const nameData = {};
    switch (type) {
        case 'CUSTOMER':
            nameData.fileName = 'Customer';
            nameData.sheetName = '客户';
            nameData.printName = 'Customer';
            break;
    }
    return nameData;
}

function getDocDefinition(type,data) {
    let objData = {};
    switch (type) {
        case 'CUSTOMER':
            objData = _getCustomerDocData(data);
            break;
    }
    return objData;
}
function _getCustomerDocData(data) {
    let docDefinition = {
        content: [
            'Fi中文呢aph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ],
        defaultStyle: {
            font: 'msyh'
        }

    };
    return docDefinition;
}

exports.transEXLData = transEXLData;//转换成excel文件插件需要的数据格式
exports.getNameData = getNameData;//获取文件名
exports.transObjData = transObjData;//excel插件获取的数据转换成数据库需要的格式
exports.getDocDefinition = getDocDefinition;//获取PDF内容
