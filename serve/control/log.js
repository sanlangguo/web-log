var db = require('../config/db')

/**
 * 数据库查询
 */
async function query(req, res, next) {
  db.pool.getConnection(async (err, connection) => {
    // id time type 查询
    let querySql = `select * from list where pro_id=${req.query.id} `;
    let sql = '';
    let totalSql = `select count(type) from list where pro_id=${req.query.id} `;
    if (req.query.starTime && req.query.endTime) {
      sql = `and create_time>=${req.query.starTime} and create_time<=${req.query.endTime} `;
    }
    if (req.query.type) {
      sql += `type=${req.query.type} `;
    }
    totalSql += sql;
    sql += `order by create_time desc limit ${req.query.size} offset ${req.query.size * req.query.count};`;
    connection.query(totalSql + ';', (errT, total) => {
      connection.query(querySql + sql, (errD, data) => {
        if (errT || errD) {
          return res.status(400).send({ ...err, msg: '参数有误' });
        }
        db.responseDoReturn(res, {
          data: data,
          total: total.length ? total[0]["count(type)"] : 0
        });
        connection.release();
      });
    });
  });
}

/**
 * 插入数据库
 */
function interLog(req, res, next) {
  db.pool.getConnection(function (err, connection) {
    connection.query(`select 1 from project where id = ${req.query.id} limit 1;`, (err, results, fields) => {
      console.log('results___>', req.body);
      if (results && results.length) {
        connection.query(`insert into list (type, msg, source, lineno, colno, tag_name, status, req_data, page_url, res_url,device, browser, pro_id, tag) values
        (${req.body.type || null}, ${req.body.msg || null},${req.body.source || req.body.src || null}, ${req.body.lineno || null},
          ${req.body.colno || null}, ${req.body.tagName || null},${req.body.status || null}, 
          ${req.body.reqData || null}, ${req.body.pageUrl || null}, ${req.body.httpUrl || null},
          ${req.body.ua || null}, ${req.body.browser || null}, ${req.query.id || null}, ${req.body.tag || null});`, function (err, results, fields) {
          if (err) {
            res.status(400).send({ ...err, msg: '参数有误' });
          } else {
            res.send({
              msg: '成功'
            });
          }
        })
      } else {
        res.send({
          msg: 'ID 错误'
        });
      }
      connection.release();
    })
  });
}

// 查询错误详情
function queryDetails(req, res, next) {
  db.pool.getConnection((err, connection) => {
    connection.query(`select * from list where id = ${req.query.id};`, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        db.responseDoReturn(res, {
          data,
        });
      }
    })
  })
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
  editLog,
  queryDetails
};