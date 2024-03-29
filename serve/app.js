/* eslint-disable no-undef */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { expressjwt: expressJWT} = require('express-jwt')
var indexRouter = require('./routes/index');
var logRouter = require('./routes/log');
var proRouter = require('./routes/project');
var app = express();
const API_VERSION = 'api/1';

app.use((req, res, next) => {
  console.log(res, '222222')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  res.header('Content-Length: 0');
  next();
});


// token
app.use(expressJWT({ secret: 'secret12345', algorithms: ["HS256"] }).unless({ path: ['/api/1/login'] }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(`/${API_VERSION}/login`, indexRouter);
app.use(`/${API_VERSION}/log/list`, logRouter);
app.use(`/${API_VERSION}/project`, proRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

module.exports = app;
