const Koa = require('koa');
const app = new Koa();
const log4js = require('log4js');
const logger = log4js.getLogger('cheese');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'info' } } 
})
app.use(async (ctx, next) => {
    logger.info('call app.....')

    Math.random() > 0.9 ? aaa() : '2';
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = 'test'
})
app.on('error', (err, ctx) => {
    logger.error(err)
})
if (!module.parent) { // 如果他不是一个主线程
    app.listen(3000);
    console.log('3000');
}else {
    module.exports = app
}