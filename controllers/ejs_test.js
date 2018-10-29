/**
 * ejs模板引擎练习
 */
const path = require('path');
const getDirFile = require('../common/getDirFile');

const ejs_testfn = async(ctx, next) => {
  let list = [];
  // 读取图片
  await getDirFile('/upload')
  .then(res => {
    console.log('res: ',res);
    list = res;
  })
  await ctx.render('ejs_test', {
    msg: 'testetsttest',
    list: list
  })
  await next();
}

module.exports = {
    method: 'get',
    list: [
      '/ejs_test',   // url
      ejs_testfn      // 处理函数
    ]
}; 