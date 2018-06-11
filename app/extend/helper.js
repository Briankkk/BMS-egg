const _ = require('lodash');

module.exports = {
    convertWhere(){
        let sqlWhere='';
        for (let key in this.ctx.query) {
            const value = _.trim(this.ctx.query[key]);
            if(value!=='') {
                if (typeof(value) === 'string') {
                    sqlWhere += ' and ' + key + ' like?';
                } else {
                    sqlWhere += ' and ' + key + ' =?';
                }
            }
        }
        return sqlWhere;
    },
    convertValue(){
        let sqlValue=[this.ctx.session.staff.CUST_ID];
        for (let key in this.ctx.query) {
            const value = _.trim(this.ctx.query[key]);
            if(value!=='') {
                if (typeof(value) === 'string') {
                    sqlValue.push('%'+value+'%');
                } else {
                    sqlValue.push(value);
                }
            }
        }
        return sqlValue;
    },

    convertLimit(){
        return ' LIMIT '+(this.ctx.pagination.PAGE_INDEX - 1) * this.ctx.pagination.PAGE_SIZE+','+this.ctx.pagination.PAGE_SIZE;
    },

    convertOrder(){
        if(this.ctx.sorter&&this.ctx.sorter.SORTER_FIELD&&this.ctx.sorter.SORTER_ORDER) {
            return ' ORDER BY ' + this.ctx.sorter.SORTER_FIELD + ' ' + this.ctx.sorter.SORTER_ORDER;
        }else{
            return '';
        }
    }
};


