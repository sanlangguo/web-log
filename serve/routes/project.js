const express = require('express');
const db = require('../control/project.js');
const router = express.Router();
const url = '/';

// 上传项目信息
router.post(url, function (req, res, next) {
  if (!req.body.name || !req.body.type) {
    res.status(400).send({ msg: 'name和type不能为空' });
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
  if (!req.body.id) {
    res.status(400).send({ msg: 'id不能为空' });
  } else {
    db.editLog(req, res, next);
  }
});

// 删除项目
router.delete(url, function(req, res, next) {
  if (!req.query.id) {
    res.status(400).send({ msg: 'id不能为空' });
  } else {
    db.deleteLog(req, res, next);
  }
});

module.exports = router;
