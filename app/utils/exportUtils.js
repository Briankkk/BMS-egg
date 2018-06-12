const _ = require('lodash');

function obj2List(obj) {
    return _.values(obj)
}
function transEXLData(data) {
    return _.map(data, obj2List);
}

function transObjData(data,type){
    let objData = {};
    switch(type){
        case 'CUSTOMER':
            objData=_.map(data, _transCustomerData);
            break;
    }
    return objData;
}

function _transCustomerData(list){
    const obj={};
    if(list[0]){
        obj.CUSTOMER_NAME=list[0];
    }
    if(list[1]){
        obj.CUSTOMER_SHORT_NAME=list[1];
    }
    if(list[2]){
        obj.CUSTOMER_CODE=list[2];
    }
    if(list[3]){
        obj.LINKMAN=list[3];
    }
    if(list[4]){
        obj.PHONE=list[4];
    }
    if(list[5]){
        obj.ADDRESS=list[5];
    }
    return obj;
}

function getNameData(type){
    const nameData = {};
    switch(type){
        case 'CUSTOMER':
            nameData.fileName='Customer';
            nameData.sheetName='客户'
            break;
    }
    return nameData;
}
exports.transEXLData = transEXLData;
exports.getNameData = getNameData;
exports.transObjData = transObjData;