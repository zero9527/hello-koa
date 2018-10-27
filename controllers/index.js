const fs = require('fs');
const path = require('path');
/**
 * 首页处理
 * @param {*} ctx 
 * @param {下一个中间件} next 
 */
const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
		<form action='/signin' method='post'>
			<p>Name: <input type='text' value='koa' name='name'></p>
			<p>Password: <input type='text' value='12345' name='password'></p>
			<p><input type='submit' value='Submit'></p>
		</form>`;
};

/**
 * 登录处理
 * @param {参数} ctx 
 * @param {下一个中间件} next 
 */
const fn_signin = async (ctx, next) => {
  console.log(`ctx.request.body: ${JSON.stringify(ctx.request.body)}`);
  var name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome ${name}</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed</h1>
		<p><a href='/'>Try again</a></p>`;
  }
};

/**
 * mysql 练习
 */
const fn_list = async (ctx, next) => {
  // 获取上级目录
  var htmlfolder = path.resolve(__dirname, '../html');
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(htmlfolder + '/list.html');
}
// 数据库查询函数
const { sql_search } = require('./sql-search')

const getList = async (ctx, next) => {
  let data;
  let id = ctx.params.id;
  // 具体的查询函数
  async function selectData() {
    let sql = 'SELECT * FROM list'
    let dataList = await sql_search(sql)
    return dataList
  }
  // 错误处理和数据返回
  try {
    data = {
      code: 200,
      msg: 'success',
      data: await selectData()
    }
  } catch (err) {
    console.log('err: ', err);
    data = {
      code: '500',
      msg: 'error'
    }
  }

  ctx.body = data;
}
/**
 * 404
 */
const fn_404 = async (ctx, next) => {
  // 获取上级目录
  var htmlfolder = path.resolve(__dirname, '../html');
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(htmlfolder + '/404.html');
}

module.exports = {
  'GET /404': fn_404,
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'GET /list': fn_list,
  'GET /getList': getList,
};