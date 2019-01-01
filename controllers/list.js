/**
 * 列表
 */
const path = require('path');

const list_fn = async(ctx, next) => {
  await ctx.render('list')
  await next();
}

module.exports = {
  method: 'get',
  list: [
    '/list',   // url
    list_fn // 处理函数
  ]
};