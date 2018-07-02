const _ = require('lodash');
const moment = require('moment');
const path = require('path');


function obj2List(obj) {
    return _.values(obj)
}
function transEXLData(data) {
    return _.map(data, obj2List);
}


function getNameData(type) {
    const nameData = {};
    switch (type) {
        case 'CUSTOMER':
            nameData.fileName = 'Customer';
            nameData.sheetName = '客户';
            nameData.printName = 'Customer';
            break;
        case 'SUPPLIER':
            nameData.fileName = 'Supplier';
            nameData.sheetName = '供应商';
            nameData.printName = 'Supplier';
            break;
        case 'MATER':
            nameData.fileName = 'Mater';
            nameData.sheetName = '原料';
            nameData.printName = 'Mater';
            break;
        case 'PROD':
            nameData.fileName = 'Prod';
            nameData.sheetName = '产品';
            nameData.printName = 'Prod';
            break;
        case 'PURCHASE':
            nameData.fileName = 'Purchase';
            nameData.sheetName = '采购单';
            nameData.printName = 'Purchase';
            break;
    }
    return nameData;
}

function transObjData(data, type) {
    let objData = {};
    switch (type) {
        case 'CUSTOMER':
            objData = _.map(data, _transCustomerData);
            break;
        case 'SUPPLIER':
            objData = _.map(data, _transSupplierData);
            break;
        case 'MATER':
            objData = _.map(data, _transMaterData);
            break;
        case 'PROD':
            objData = _.map(data, _transProdData);
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

function _transSupplierData(list) {
    const obj = {};
    if (list[0]) {
        obj.SUPPLIER_NAME = list[0];
    }
    if (list[1]) {
        obj.SUPPLIER_SHORT_NAME = list[1];
    }
    if (list[2]) {
        obj.SUPPLIER_CODE = list[2];
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
    if (list[6]) {
        obj.FAX = list[6];
    }
    if (list[7]) {
        obj.EMAIL = list[7];
    }
    return obj;
}

function _transMaterData(list) {
    const obj = {};
    if (list[0]) {
        obj.MATER_NAME = list[0];
    }
    if (list[1]) {
        obj.MATER_CODE = list[1];
    }
    if (list[2]) {
        obj.MATER_TYPE_NAME = list[2];
    }
    if (list[3]) {
        obj.MATER_UNIT = list[3];
    }
    if (list[4]) {
        obj.MATER_NUM = list[4];
    }
    if (list[5]) {
        obj.MATER_HINT_MIN = list[5];
    }
    return obj;
}

function _transProdData(list) {
    const obj = {};
    if (list[0]) {
        obj.PROD_NAME = list[0];
    }
    if (list[1]) {
        obj.PROD_CODE = list[1];
    }
    if (list[2]) {
        obj.PROD_TYPE_NAME = list[2];
    }
    if (list[3]) {
        obj.CUSTOMER_NAME = list[3];
    }
    if (list[4]) {
        obj.PROD_UNIT = list[4];
    }
    if (list[5]) {
        obj.PROD_NUM = list[5];
    }
    return obj;
}


function getDocDefinition(type, data) {
    let objData = {};
    switch (type) {
        case 'CUSTOMER':
            objData = _getCustomerDocData(data);
            break;
        case 'PURCHASE':
            objData = _getPurchaseDocData(data);
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

function _getPurchaseDocData(data) {

    const purchaseData = data.purchaseData;

    const imagePath = require('path').resolve(__dirname, '../public/images/purchase.png');

    const docDefinition = {
        content: [
            {
                alignment: 'justify',
                columns: [
                    {
                        image: imagePath,
                        width: 49,
                        height: 31
                    },
                    {text: 'HS2-Q-07-R03', fontSize: 8, width: 100, margin: [10, 10]},
                    {text: '采 购 订 单', style: 'header', fontSize: 20, alignment: 'center', width: 240}

                ]
            }, {
                style: 'tableExample',
                color: '#444',
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            {text: '订单编号', style: 'tableHeader', alignment: 'center'},
                            {text: purchaseData[0].PURCHASE_CODE, colSpan: 2}, {},
                            {text: '订单日期', style: 'tableHeader', alignment: 'center'},
                            {text: moment(purchaseData[0].CREATE_TIME).format('YYYY-MM-DD'), colSpan: 2},
                            {},
                            {text: purchaseData[0].CUST_NAME, colSpan: 3},
                            {}, {}
                        ],
                        [
                            {
                                text: '联系电话',
                                style: 'tableHeader',
                                colSpan: 1,
                                alignment: 'center'
                            },
                            {

                                text: purchaseData[0].PHONE + '',
                                colSpan: 4,
                                alignment: 'center'
                            }, {}, {}, {},
                            {
                                rowSpan: 5,
                                colSpan: 4,
                                text: '电话：' + purchaseData[0].CUST_PHONE + ' \n  传真（Fax）：' + purchaseData[0].CUST_FAX + '\n ' +
                                '税号：' + purchaseData[0].TAX_NUMBER + '\n ' +
                                '开户行：' + purchaseData[0].BANK_NAME + '\n ' +
                                '帐号：' + purchaseData[0].BANK_ACCOUNT + '\n ' +
                                '行号：' + purchaseData[0].BANK_NUMBER
                            },
                            {}, {}, {}
                        ],
                        [
                            {text: '供 应 商', style: 'tableHeader', alignment: 'center'},
                            {text: purchaseData[0].SUPPLIER_NAME + '', colSpan: 4, alignment: 'center'},
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {text: '接 受 人', style: 'SUPPLIER_LINKMAN', alignment: 'center'},
                            {text: purchaseData[0].SUPPLIER_PHONE + '', colSpan: 4, alignment: 'center'},
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {text: '电    话', style: 'tableHeader', alignment: 'center'},
                            {text: purchaseData[0].SUPPLIER_PHONE + '', colSpan: 4, alignment: 'center'},
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {text: '传    真', alignment: 'center', style: 'tableHeader'},
                            {text: purchaseData[0].SUPPLIER_FAX + '', colSpan: 4, alignment: 'center'},
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {text: '序号', alignment: 'center'},
                            {text: '品名', alignment: 'center'},
                            {text: '材料型号', alignment: 'center'},
                            {text: '规格', alignment: 'center'},
                            {text: '数量', alignment: 'center'},
                            {text: '单位', alignment: 'center'},
                            {text: '单价', alignment: 'center'},
                            {text: '金额', alignment: 'center'},
                            {text: '备注', alignment: 'center'}
                        ]
                    ]
                }
            },
            {
                text: purchaseData[0].CUST_NAME,
                fontSize: 10,
                alignment: 'center'
            },
            {
                text: "制单人:江林干              审批人:季伟",
                fontSize: 12,
                margin: [10, 10, 10, 10],
                alignment: 'center'
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                margin: [0, 0, 0, 10]
            }
            ,
            tableExample: {
                margin: [0, 5, 0, 0]
            }
            ,
            tableHeader: {
                fontSize: 13
            },

        },
        defaultStyle: {
            font: 'msyh'
        }

    };
    _(purchaseData).forEach(function(value,index) {
        var objArr = [];
        objArr.push({alignment: 'center', text: (index + 1) + '.'});
        objArr.push({alignment: 'center', text: value.MATER_NAME ? value.MATER_NAME + '' : ''});
        objArr.push({alignment: 'center', text: value.MATER_CODE ? value.MATER_CODE + '' : ''});
        objArr.push({alignment: 'center', text: value.MATER_SPEC ? value.MATER_SPEC + '' : ''});
        objArr.push({alignment: 'center', text: value.MATER_NUM ? value.MATER_NUM + '' : ''});
        objArr.push({alignment: 'center', text: value.MATER_UNIT ? value.MATER_UNIT + '' : ''});
        objArr.push({alignment: 'center', text: value.UNIT_PRICE ? value.UNIT_PRICE + '' : ''});
        objArr.push({alignment: 'center', text: value.PRICE ? value.PRICE + '' : ''});
        objArr.push({alignment: 'center', text: value.MATER_REMRAK ? value.MATER_REMRAK + '' : ''});
        docDefinition.content[1].table['body'].push(objArr);
    });
    const footer1 = [
        {text: '采购要求', fontSize: 16, colSpan: 9, alignment: 'center'},
        {}, {}, {}, {}, {}, {}, {}, {}
    ];
    const footer2 = [
        {text: '技术要求', style: 'tableHeader'},
        {text: '具体按图纸要求执行', colSpan: 8, alignment: 'center'},
        {}, {}, {}, {}, {}, {}, {}
    ];

    const footer3 = [
        {text: '交货期', style: 'tableHeader'},
        {text: moment(purchaseData[0].DELIVER_DATE).format('YYYY-MM-DD') + '之前到货', colSpan: 4, alignment: 'center'},
        {}, {}, {},
        {text: '检验方法', style: 'tableHeader'},
        {text: '按《进货检验规范》执行', colSpan: 3},
        {}, {}
    ];


    const footer4 = [
        {text: '交货地点', style: 'tableHeader'},
        {text: purchaseData[0].STORE_HOUSE, colSpan: 8},
        {}, {}, {}, {}, {}, {}, {}
    ];

    const footer5 = [
        {text: '备 注', style: 'tableHeader', rowSpan: 3},
        {text: '1.接受人签字盖章后回传，2日内不回传视为接受。', colSpan: 8},
        {}, {}, {}, {}, {}, {}, {}
    ];
    const footer6 = [{},
        {text: '2.收到订单后如有异意，请在两日内书面形式提出，否则视为默认，自然生效。', colSpan: 8},
        {}, {}, {}, {}, {}, {}, {}
    ];
    const footer7 = [{},
        {text: '3.严格按交货期交货，送货单上必须填写对应采购单号，\n送货数量应与订单数量一致。', colSpan: 8},
        {}, {}, {}, {}, {}, {}, {}
    ];

    const footer8 = [
        {text: '接受人/日期'},
        {text: '', colSpan: 8},
        {}, {}, {}, {}, {}, {}, {}
    ];
    const footer9 = [
        {text: '确认上述内容后，请遵守交货期。', colSpan: 9, alignment: 'center'},
        {}, {}, {}, {}, {}, {}, {}, {}
    ];

    docDefinition.content[1].table['body'].push(footer1);
    docDefinition.content[1].table['body'].push(footer2);
    docDefinition.content[1].table['body'].push(footer3);
    docDefinition.content[1].table['body'].push(footer4);
    docDefinition.content[1].table['body'].push(footer5);
    docDefinition.content[1].table['body'].push(footer6);
    docDefinition.content[1].table['body'].push(footer7);
    docDefinition.content[1].table['body'].push(footer8);
    docDefinition.content[1].table['body'].push(footer9);

    return docDefinition;
}

exports.transEXLData = transEXLData;//转换成excel文件插件需要的数据格式
exports.getNameData = getNameData;//获取文件名
exports.transObjData = transObjData;//excel插件获取的数据转换成数据库需要的格式
exports.getDocDefinition = getDocDefinition;//获取PDF内容
