const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const secretKey = 'secret12345'

/* GET home page. */
router.post('/', function(req, res) {
  const token = jwt.sign({ number: req.body.number }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    msg: '登陆成功',
    token,
    number: req.body.number
  })
});

module.exports = router;
