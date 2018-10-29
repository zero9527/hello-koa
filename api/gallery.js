/**
 * 相册
 */
const getDirFile = require('../common/getDirFile');

var getGallery = async (ctx, next) => {
	ctx.response.type = 'json';
	getDirFile('/upload').then(res => {
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
// 暴露请求的方式，地址，调用的函数
module.exports = {
  method: 'get',
  list: [
    '/getGallery',    // url
    getGallery        // 处理函数
  ]
}