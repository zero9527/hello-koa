// koa
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
const views = require('koa-views');
const serve = require('koa-static');	// 静态资源处理
const fs = require('fs');

const gallery = require('./api/gallery');
const upload = require('./api/upload');
const home = require('./controllers/home');
const main = serve(path.join(__dirname, './views'));
app.use(main);

// 注册 koa-bodyParser
// 需要放在 router 之前
app.use(bodyParser());

// ejs模板引擎
app.use(views('./views', { extension: 'ejs' }));

// 路由处理
const router = require('koa-router')();
const controller = require('./controller');

// 使用 controller.js
app.use(controller());

app.use(async (ctx, next) => {
  let sc = /\.css|\.js|\.png|\.jpg/i;
  if (ctx.response.status == 404) {
    await ctx.render('404');
  }
  if (!sc.test(ctx.req.url)) {
    console.log(`------------------
    请求方式：${ctx.req.method}, url:${ctx.req.url}\n`);
  }
  // 调用下一个中间件
  await next();
})

router.get('/list', async (ctx, next) => {
  await ctx.render('list');
  // 调用下一个中间件
  await next();
})

router.get('/uploadfile', async (ctx, next) => {
  await ctx.render('uploadfile');
  // 调用下一个中间件
  await next();
})

router.get('/gallery', async (ctx, next) => {
  await ctx.render('gallery');
  // 调用下一个中间件
  await next();
})

// 首页
router[home.method](...home.list);

// console.log('gallery: ',gallery);
// 相册
router[gallery.method](...gallery.list);

// console.log('\nupload: ',upload);
// 文件上传
router[upload.method](...upload.list);

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
module.exports = app;
