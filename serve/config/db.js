var mysql = require('mysql');

const mySqlConf = {
  host: 'localhost',
  user: 'root',
  password: '123456aa',
  insecureAuth : true
};
    
// 使用连接池连接数据库，避免开太多的线程，提升性能
var pool = mysql.createPool(mySqlConf);

/**
 * 封装数据库查询结果，返回JSON
 */
function responseDoReturn(res, result) {
  if (typeof result === 'undefined') {
    res.json({
      code: '201',
      msg: 'failed to do'
    });
  } else {
    res.json(result);
  }
}

/**
 * 封装数据库查询
 */
function query(req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query('select * FROM log_list', function (err, rows) {
      responseDoReturn(res, rows);
      // 释放数据库连接
      connection.release();
    });
  });
}

// 导出模块
module.exports = {
  queryAll: query
};