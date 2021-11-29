var express = require('express');
var router = express.Router();

/* 登录 */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 登录 */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
