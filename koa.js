// koa
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
const views = require('koa-views');
const serve = require('koa-static');	// 静态资源处理

const gallery = require('./api/gallery');
const upload = require('./api/upload');
const ejs_test = require('./controllers/ejs_test');
const main = serve(path.join(__dirname));
app.use(main);

// 注册 koa-bodyParser
// 需要放在 router 之前
app.use(bodyParser());

// ejs模板引擎
app.use(views('./views', {extension: 'ejs'}));

// 路由处理
const router = require('koa-router')();
const controller = require('./controller');

// 使用 controller.js
app.use(controller());

app.use(async (ctx, next) => {
	// 调用下一个中间件
	await next();
  console.log(`------------------
  \n请求方式：${ctx.req.method}, url:${ctx.req.url}`);
})

router.get('/file', async (ctx, next) => {
  await ctx.render('gallery');
	// 调用下一个中间件
	await next();
})

router.get('/gallery', async (ctx, next) => {
  await ctx.render('gallery');
	// 调用下一个中间件
	await next();
}) 
// console.log('gallery: ',gallery);
// 相册
router[gallery.method](...gallery.list);

// console.log('\nupload: ',upload);
// 文件上传
router[upload.method](...upload.list);

console.log('\nejs_test: ',ejs_test);
// ejs模板引擎练习
router[ejs_test.method](...ejs_test.list);

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
