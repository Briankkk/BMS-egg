const Service = require('egg').Service;
const moment = require('moment');
const _ = require('lodash');
const getSeqCode = require('../utils/seqCodeUtils').getSeqCode;

class PurchaseService extends Service {
    async index() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        let sqlWhere = '';
        let sqlValue = [this.ctx.session.staff.CUST_ID];
        let sqlOrder = '';

        const purchaseCode = _.trim(this.ctx.query.PURCHASE_CODE);
        const supplierId = _.trim(this.ctx.query.SUPPLIER_ID);
        if (purchaseCode !== '') {
            sqlWhere += ' and a.PURCHASE_CODE like?';
            sqlValue.push('%' + purchaseCode + '%');
        }
        if (supplierId !== '') {
            sqlWhere += ' and a.SUPPLIER_ID =?';
            sqlValue.push(supplierId);
        }

        if (this.ctx.sorter && this.ctx.sorter.SORTER_FIELD && this.ctx.sorter.SORTER_ORDER) {
            if (this.ctx.sorter.SORTER_FIELD === 'SUPPLIER_NAME') {
                sqlOrder = ' ORDER BY b.SUPPLIER_NAME ' + this.ctx.sorter.SORTER_ORDER;
            } else if (this.ctx.sorter.SORTER_FIELD === 'DELIVER_DATE') {
                sqlOrder = ' ORDER BY a.DELIVER_DATE ' + this.ctx.sorter.SORTER_ORDER;
            }

        }


        const total = await client.query('select count(1) cnt from purchase a where a.CUST_ID=?' + sqlWhere, sqlValue);
        const result = await client.query('select a.PURCHASE_ID as PURCHASE_ID,a.PURCHASE_CODE as PURCHASE_CODE,a.SUPPLIER_ID as SUPPLIER_ID,a.PHONE as PHONE,a.REMARK as REMARK,a.DELIVER_DATE as DELIVER_DATE,a.STATE as STATE,a.CREATE_TIME as CREATE_TIME,b.SUPPLIER_NAME as SUPPLIER_NAME from purchase a join supplier b on a.SUPPLIER_ID=b.SUPPLIER_ID where a.CUST_ID=? ' + sqlWhere + sqlOrder + helper.convertLimit(), sqlValue);

        return {total: total[0].cnt, list: result};
    }


    async show() {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const result = await client.query('select a.PURCHASE_ID as PURCHASE_ID,a.SUPPLIER_ID as SUPPLIER_ID,a.PURCHASE_CODE as PURCHASE_CODE,a.PHONE as PHONE,a.REMARK as REMARK,a.DELIVER_DATE as DELIVER_DATE,a.CREATE_TIME as CREATE_TIME,a.STATE as STATE,b.MATER_ID as MATER_ID,b.MATER_NUM as MATER_NUM,b.UNIT_PRICE as UNIT_PRICE,b.MATER_SPEC as MATER_SPEC,b.PRICE as PRICE,b.DELIVER_DATE as DELIVER_DATE,b.MATER_REMRAK as MATER_REMRAK,b.PURCHASE_STATE as PURCHASE_STATE,c.SUPPLIER_NAME as SUPPLIER_NAME, d.MATER_NAME as MATER_NAME,d.MATER_CODE as MATER_CODE from purchase a join purchase_mater b on a.PURCHASE_ID=b.PURCHASE_ID join supplier c on a.SUPPLIER_ID=c.SUPPLIER_ID  join mater d on b.MATER_ID=d.MATER_ID where a.PURCHASE_ID=?', [this.ctx.params.id]);
        return result;
    }

    async queryById(purchaseId) {
        const helper = this.ctx.helper;
        const client = helper.getClient();

        const result = await client.query('select a.PURCHASE_ID as PURCHASE_ID,a.SUPPLIER_ID as SUPPLIER_ID,a.PURCHASE_CODE as PURCHASE_CODE,a.PHONE as PHONE,a.REMARK as REMARK,a.DELIVER_DATE as DELIVER_DATE,a.CREATE_TIME as CREATE_TIME,a.UPDATE_TIME as UPDATE_TIME,a.STATE as STATE,b.MATER_ID as MATER_ID,b.MATER_NUM as MATER_NUM,b.UNIT_PRICE as UNIT_PRICE,b.MATER_SPEC as MATER_SPEC,b.PRICE as PRICE,b.DELIVER_DATE as MATER_DELIVER_DATE,b.MATER_REMRAK as MATER_REMRAK,b.PURCHASE_STATE as PURCHASE_STATE,c.SUPPLIER_NAME as SUPPLIER_NAME, c.FAX as SUPPLIER_FAX,c.PHONE as SUPPLIER_PHONE,c.LINKMAN as SUPPLIER_LINKMAN, d.MATER_NAME as MATER_NAME,d.MATER_CODE as MATER_CODE,d.MATER_UNIT as MATER_UNIT,e.CUST_NAME as CUST_NAME,e.CUST_PHONE as CUST_PHONE,e.CUST_ADDRESS as CUST_ADDRESS,e.FAX as CUST_FAX,e.TAX_NUMBER as TAX_NUMBER,e.BANK_NAME as BANK_NAME,e.BANK_ACCOUNT as BANK_ACCOUNT,e.BANK_NUMBER as BANK_NUMBER,e.STORE_HOUSE as STORE_HOUSE from purchase a join purchase_mater b on a.PURCHASE_ID=b.PURCHASE_ID join supplier c on a.SUPPLIER_ID=c.SUPPLIER_ID  join mater d on b.MATER_ID=d.MATER_ID join CUST e on a.CUST_ID=e.CUST_ID where a.PURCHASE_ID=?', [purchaseId]);
        return result;
    }

    async create(purchase, maters) {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const prefix = moment().format('YYYYMM');
        const lastPurchase = await client.query('select PURCHASE_CODE from purchase where PURCHASE_CODE like? order by PURCHASE_ID desc', ['%' + prefix + '%']);
        const seq = (lastPurchase && lastPurchase.length > 0) ? lastPurchase[0].PURCHASE_CODE.substring(6, 9) : '100';
        purchase.PURCHASE_CODE = getSeqCode(prefix, seq, this.ctx.session.staff.CUST_CODE === 'JSHS' ? '-1' : '');


        const conn = await client.beginTransaction(); // 初始化事务

        try {
            const purchaseResult = await client.insert('purchase', {
                ...purchase,
                CUST_ID: this.ctx.session.staff.CUST_ID
            });
            for (let mater of maters) {
                mater.PURCHASE_ID = purchaseResult.insertId;
                await client.insert('purchase_mater', {...mater, PURCHASE_STATE: '0'});
            }
            await conn.commit();
        } catch (err) {
            await conn.rollback();
            throw err;
        }
        return purchase;
    }


    async destroy() {
        const helper = this.ctx.helper;
        const client = helper.getClient();
        const options = {
            where: {
                PURCHASE_ID: this.ctx.params.id
            }
        };
        const result = await client.update('purchase',{STATE:'D',UPDATE_TIME:client.literals.now},options);
        return result;
    }
}

module.exports = PurchaseService;