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
      msg: 'failed to do'
    });
  } else {
    res.json(result);
  }
}

/**
 * 数据库查询
 */
function query(req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query('select * from list;', function (err, rows) {
      responseDoReturn(res, rows);
      // 释放数据库连接
      connection.release();
    });
  });
}

/**
 * 插入数据库
 */
function interLog(req, res, next) {
  console.log(req.body,  '______<<<<')
  pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO list(type,msg,request_data,id) VALUES(?,?,?,?);', [req.body.type,req.body.msg,req.body.request_data,req.body.id], function (err, results, fields) {
      if (err || !req.body.type || req.body.msg) {
        res.status(400).send({ ...err, msg: '参数有误'});
      } else {
        res.send({
          msg: '成功'
        });
      }
      // 释放数据库连接
      connection.release();
    });
  });
}

/**
 * 删除当前数据
 */
function deleteLog(req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO list(type,msg,request_data,id) VALUES(?,?,?,?);', [req.body.type,req.body.msg,req.body.request_data,req.body.id], function (err, results, fields) {
      if (err || !req.body.type || req.body.msg) {
        res.status(400).send({ ...err, msg: '参数有误'});
      } else {
        res.send({
          msg: '成功'
        });
      }
      // 释放数据库连接
      connection.release();
    });
  });
}

/**
 * 编辑当前数据
 */
function editLog (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO list(type,msg,request_data,id) VALUES(?,?,?,?);', [req.body.type,req.body.msg,req.body.request_data,req.body.id], function (err, results, fields) {
      if (err) {
        res.status(400).send({ ...err, msg: '参数有误'});
      } else {
        res.send({
          msg: '成功'
        });
      }
      // 释放数据库连接
      connection.release();
    });
  });
}


// 导出模块
module.exports = {
  queryAll: query,
  interLog,
  deleteLog,
  editLog,
  responseDoReturn,
  pool
};