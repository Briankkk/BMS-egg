module.exports = options => {
    return async function pagination(ctx, next) {
        let query = ctx.query;
        if (query['PAGE_INDEX'] && query['PAGE_SIZE']) {
            ctx.pagination = {
                PAGE_INDEX: parseInt(query['PAGE_INDEX']),
                PAGE_SIZE: parseInt(query['PAGE_SIZE'])
            };
            delete ctx.query.PAGE_SIZE;
            delete ctx.query.PAGE_INDEX;
        }
        if (query['SORTER_FIELD'] && query['SORTER_ORDER']) {
            ctx.sorter = {
                SORTER_FIELD: query['SORTER_FIELD'],
                SORTER_ORDER: query['SORTER_ORDER']==='descend'?'DESC':'ASC',
            };
            delete ctx.query.SORTER_FIELD;
            delete ctx.query.SORTER_ORDER;
        }
        await next();
    }
};