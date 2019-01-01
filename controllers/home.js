/**
 * 主页
 */
const path = require('path');
const getDirFile = require('../common/getDirFile');

const home_fn = async(ctx, next) => {
  let list = [];
  // 读取文件
  await getDirFile('/views')
  .then(res => {
    console.log('res: ',res);
    list = res;
  })
  await ctx.render('home', {
    msg: 'nav',
    navlink: list
  })
  await next();
}

module.exports = {
    method: 'get',
    list: [
      '/',   // url
      home_fn // 处理函数
    ]
};