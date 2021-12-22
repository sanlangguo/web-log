var db = require('../config/db')

/**
 * 数据库查询
 */
function query(req, res, next) {
  let sql = 'select * from project ';
  if (req.query.id) {
    sql += `where id = ${req.query.id};`
  } else if (req.query.name) {
    sql += `where name = ${req.query.name};`
  } else {
    sql += ';'
  }
  db.pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
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
    connection.query(`insert into project (type,name) values ('${req.body.type}','${req.body.name}');`, function (err, results, fields) {
      console.log(err, 'err')
      if (err || !req.body.type || !req.body.name) {
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
    connection.query(`delete from project where id=${req.query.id}`, function (err, results, fields) {
      if (err || !req.query.id) {
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
    connection.query(`UPDATE project SET name='${req.body.name}' WHERE id=${req.body.id};`, function (err, results, fields) {
      if (err) {
        res.status(400).send({ ...err, msg: '参数有误' });
      } else {
        res.send({
          msg: '修改成功'
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