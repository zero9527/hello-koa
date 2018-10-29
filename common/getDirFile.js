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

		for (var i = 0; i < files.length; i++) {
			list.push({
				extname: path.extname(files[i]),
				name: files[i],
				path: `${dir}/` + files[i]
			});
		}
		console.log('\ngetDirFile_list: ', list);
		if (list.length) resolve(list);
		else reject();
	})
}

module.exports = getDirFile