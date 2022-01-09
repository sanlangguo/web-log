const express = require('express');
const db = require('../control/log.js');
const router = express.Router();
const url = '/';

// 上传日志信息
router.post(url, function (req, res, next) {
  if (!req.query.id) {
    res.status(400).send({ msg: '项目ID不能为空' });
  } else {
    db.interLog(req, res, next);
  }
});

// 查询信息
router.get(url, function (req, res, next) {
  console.log('--', req)
  if (req.query.id) {
    db.query(req, res, next);
  } else {
    res.status(400).send({ msg: 'id不能为空' });
  }
});

// 查询错误详细信息
router.get(url + 'details', function (req, res, next) {
  console.log('-->>', req);
  if (req.query.id) {
    db.queryDetails(req, res, next);
  } else {
    res.status(400).send({ msg: 'id不能为空' });
  }
});

// 修改当前状态
router.put(url, function (req, res, next) {
  console.log(req.body, res, next, 'req, res, next');
  if (!req.body.id) {
    res.status(400).send({ msg: 'id不能为空' });
  } else {
    res.editLog(req, res, next);
  }
});

module.exports = router;
