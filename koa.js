// koa
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
// 文件上传
const koaBody = require('koa-body');
const fs = require('fs');

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
	console.log(`请求方式：${ctx.req.method}, url:${ctx.req.url}`);
	// 调用下一个中间件
	await next();
})

router.get('/file', async(ctx, next) => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream(__dirname + '/html/upload.html');
})


/**
 * 文件上传
 */
const multer = require('koa-multer');
// multer配置
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/upload/')
	},
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null, `${Date.now()}.${fileFormat[fileFormat.length -1]}`);;
	}
})
// 加载配置
var upload = multer({ storage: storage });
// 路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
	console.log(`ctx.req.file: ${JSON.stringify(ctx.req.file)}`);
	ctx.body = {
		path: ctx.req.file.path	// 返回文件路径
	}
})

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
