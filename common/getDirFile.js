/**
 * 获取文件夹内的文件、文件夹（暂无）
 */
const fs = require('fs');
const path = require('path');
const root_dir = path.resolve(__dirname, '..');

/**
 * @param {目录名} dir 
 */
var getDirFile = (dir) => {
	return new Promise((resolve, reject) => {
		var list = [];
    var files = fs.readdirSync(root_dir + dir);
    let relDir = '';
    if (dir.includes('views')) {  // 请求资源
      relDir = dir.substring(dir.indexOf('views')+5,dir.length);
    }
		for (var i = 0; i < files.length; i++) {
      if (!files[i].includes('.')) {
        list.push({
          extname: path.extname(files[i]),
          name: files[i],
          path: files[i] + '/index.html'
        });
      } else if (/\.ejs|\.html/i.test(path.extname(files[i]))) { // html，ejs
        list.push({
          extname: path.extname(files[i]),
          name: files[i].substring(0, files[i].indexOf('.')),
          path: files[i].substring(0, files[i].indexOf('.'))
        });
      } else {  // 静态资源
        list.push({
          extname: path.extname(files[i]),
          name: files[i],
          path: `.${relDir}/` + files[i]
        });
      }
		}
		// console.log('\ngetDirFile_list: ', list);
		if (list.length) resolve(list);
		else reject();
	})
}

module.exports = getDirFile