/**
 * 文件上传
 */
const path = require('path');
const multer = require('koa-multer');

const root_dir = path.resolve(__dirname, '..');
// multer配置
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, root_dir + '/upload/')
	},
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`);;
	}
})
// 加载配置
var upload = multer({ storage: storage });
// 处理函数
var uploadFn = async (ctx, next) => {
  console.log('ctx.req.file: ',ctx.req.file);
	ctx.body = {
		path: ctx.req.file.path	// 返回文件路径
	}
	// 调用下一个中间件
	await next();
}

// 暴露请求的方式，地址，调用的函数
module.exports = {
  method: 'post',
  list: [
    '/upload',
    upload.single('file'),
    uploadFn
  ]
}