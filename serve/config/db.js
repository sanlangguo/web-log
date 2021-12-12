var mysql = require('mysql');

const mySqlConf = {
  host: 'localhost',
  user: 'root',
  database: 'log_list',
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
      data: null,
      msg: 'failed to do'
    });
  } else {
    res.json(result);
  }
}

// 导出模块
module.exports = {
  responseDoReturn,
  pool
};