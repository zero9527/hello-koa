// 文件系统模块
const fs = require('fs');
function addMapping(router, mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET')) {
			var path = url.substring(4);	//去除请求方式，只保留请求url
			router.get(path, mapping[url]);

		} else if (url.startsWith('POST')) {
			var path = url.substring(5);
			router.post(path, mapping[url]);
		} else {
			console.log(`invalid URL: ${url}`);
		} 
	}
}
// 添加控制器
function addControllers(router) {
	var files = fs.readdirSync(__dirname + '/controllers/');
	// 过滤 js文件
	var js_files = files.filter((f) => {
		return f.endsWith('.js');
	})

	for (var f of js_files) {
		console.log(`process controller: ${f}...`);
		// 引入 controller
		let mapping = require(__dirname + '/controllers/' + f);
		addMapping(router, mapping);
	}
}
module.exports = function(dir) {
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}