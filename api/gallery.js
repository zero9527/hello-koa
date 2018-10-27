/**
 * 相册
 */
// 路由处理
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const root_dir = path.resolve(__dirname, '..');

// 相册
var getGallery = async (ctx, next) => {
	ctx.response.type = 'json';
	getDirFile().then(res => {
		console.log('res: ', res);
		// 组装返回的数据
		let obj = {
			code: 1,
			data: res,
			msg: ""
		}
		ctx.body = JSON.stringify(obj);
	})
		.catch(err => {
			console.log('err: ', err);
		})
	// 调用下一个中间件
	await next();
}
// 获取目录文件
var getDirFile = () => {
	return new Promise((resolve, reject) => {
		var list = [];
		var files = fs.readdirSync(root_dir + '/upload');

		for (var i = 0; i < files.length; i++) {
			list.push({
				extname: path.extname(files[i]),
				name: files[i],
				path: '/upload/' + files[i]
			});
		}
		console.log('list: ', list);
		if (list.length) resolve(list);
		else reject();
	})
}

// 暴露请求的方式，地址，调用的函数
module.exports = {
	method: 'get',
	url: '/getGallery',
	fn: getGallery
}