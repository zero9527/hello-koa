// koa
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
// 文件上传
const koaBody = require('koa-body');
const fs = require('fs');
const gallery = require('./api/gallery');
const upload = require('./api/upload');

const serve = require('koa-static');	// 静态资源处理
const main = serve(path.join(__dirname));
app.use(main);

// 注册 koa-bodyParser
// 需要放在 router 之前
app.use(bodyParser());

// 路由处理
const router = require('koa-router')();
const controller = require('./controller');

// 使用 controller.js
app.use(controller());

app.use(async (ctx, next) => {
  console.log(`------------------
  \n请求方式：${ctx.req.method}, url:${ctx.req.url}`);
	// 调用下一个中间件
	await next();
})

router.get('/file', async (ctx, next) => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream(__dirname + '/html/upload.html');
	// 调用下一个中间件
	await next();
})

router.get('/gallery', async (ctx, next) => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream(__dirname + '/html/gallery.html');
	// 调用下一个中间件
	await next();
}) 
// console.log('gallery: ',gallery);
// 相册
router[gallery.method](gallery.url, gallery.fn);

console.log('upload: ',upload);
// 文件上传
router[upload.method](...upload.list);

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
