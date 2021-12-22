var db = require('../config/db')

/**
 * 数据库查询
 */
function query(req, res, next) {
  db.pool.getConnection(function (err, connection) {
    connection.query('select * from list;', function (err, rows) {
      db.responseDoReturn(res, rows);
      // 释放数据库连接
      connection.release();
    });
  });
}

/**
 * 插入数据库
 */
function interLog(req, res, next) {
  db.pool.getConnection(function (err, connection) {
    connection.query(`insert into list (type,msg,source,
      lineno, colno, tag_name, status, req_data, res_url, res_data) values
    (${req.body.type},${req.body.msg},${req.body.source},
        ${req.body.lineno}, ${req.body.colno}, ${req.body.tagName}, 
        ${req.body.status},${req.body.resData}, 
        ${req.body.reqUrl},${req.body.reqData});`, function (err, results, fields) {
      if (err || !req.body.type || !req.body.msg) {
        res.status(400).send({ ...err, msg: '参数有误' });
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
  db.pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO list(type,msg,request_data,id) VALUES(?,?,?,?);', [req.body.type, req.body.msg, req.body.request_data, req.body.id], function (err, results, fields) {
      if (err || !req.body.type || !req.body.msg) {
        res.status(400).send({ ...err, msg: '参数有误' });
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
function editLog(req, res, next) {
  db.pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO list(type,msg,request_data,id) VALUES(?,?,?,?);', [req.body.type, req.body.msg, req.body.request_data, req.body.id], function (err, results, fields) {
      if (err) {
        res.status(400).send({ ...err, msg: '参数有误' });
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
  query,
  interLog,
  deleteLog,
  editLog
};