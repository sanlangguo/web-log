const express = require('express');
const db = require('../control/log.js');
const router = express.Router();
const url = '/';

// 上传信息
router.post(url, function (req, res, next) {
  if (!req.body.msg || !req.body.type) {
    res.status(400).send({ msg: 'msg和type不能为空' });
  } else {
    db.interLog(req, res, next);
  }
});

// 查询信息
router.get(url, function (req, res, next) {
  db.query(req, res, next);
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
