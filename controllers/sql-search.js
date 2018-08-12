/**
 * 连接 mysql数据库
 */
const mysql = require('mysql');

// 数据库连接配置
var config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    connectionLimit: 20
} 
// 连接池
const pool = mysql.createPool(config);

// Promise 封装
const sql_search = (sql, values) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(( err, conn ) => {
            // 数据库连接失败
            if (err) return reject(err)
            // 数据库链接成功，查询数据
            conn.query(sql, values, ( error, rows ) => {
                if (error) reject(error)
                else resolve(rows)
                // 连接释放
                conn.release()
            })
        })
    })
}

module.exports = { sql_search }