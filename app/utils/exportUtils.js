const _ = require('lodash');

function obj2List(obj) {
    return _.values(obj)
}
function transEXLData(data) {
    return _.map(data, obj2List);
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