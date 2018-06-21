module.exports = options => {
    return async function handlerlog(ctx, next) {
        const log={
            CUST_NAME:ctx.session.staff&&ctx.session.staff.CUST_NAME,
            CUST_CODE:ctx.session.staff&&ctx.session.staff.CUST_CODE,
            STAFF_NAME:ctx.session.staff&&ctx.session.staff.STAFF_NAME,
            STAFF_CODE:ctx.session.staff&&ctx.session.staff.STAFF_CODE,
            HANDLER_TYPE:ctx.request.method,
            HANDLER_NAME:ctx.request.url,
            HANDLER_HEADER:JSON.stringify(ctx.request.header),
            HANDLER_BODY:JSON.stringify(ctx.request.body)
        }
        await ctx.service.handlerLog.create(log);
        await next();
    }
};