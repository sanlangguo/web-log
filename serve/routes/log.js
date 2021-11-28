var express = require('express');
var db = require('../config/db');
var router = express.Router();
const url = '/';

// 上传信息
router.post(url, function(req, res, next) {
  console.log(req.body, res, next, 'req, res, next');
  res.send(req.body);
});

// 查询信息
router.get(url, function(req, res, next) {
  console.log(req.body, res, next, 'req, res, next');
  // res.send(req.body);
  db.queryAll(req, res, next);
});

// 修改当前状态
router.put(url, function(req, res, next) {
  console.log(req.body, res, next, 'req, res, next');
  res.send(req.body);
});

module.exports = router;
