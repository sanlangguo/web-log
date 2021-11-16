console.log('2222')


import { getBrowser, getDevices, getSystemVersion } from './device.js'
import { windowRrror, unhandledrejection, error, httpError } from './error.js'


/*
* @Author: sanlangguo
* @Date:   2021-11-15 18:28
*/
;(function () {
  console.log(222)
  if (window.webLog) {
    return window.webLog
  }
  /*
  *  默认上报的错误信息
  */
  var defaults = {
    ua: window.navigator.userAgent,
    browser: getBrowser(),
    os: getDevices(),
    osVersion: getSystemVersion(),
    pageUrl: window.location.href,
    env: 'dev',
    msg: '', // 错误的具体信息
    httpUrl: '', // 错误上报服务器地址
    line: '', // 错误所在的行
    col: '', // 错误所在的列
    error: '' // 具体的error对象
  }

  window.WebLog = function (config) {
    console.log(config, '---')
    if (!config.token) {
      throw('token does not exist')
    }
    if (!config.httpUrl) {
      throw('httpUrl does not exist')
    }
    if (!config.projectname) {
      throw('projectname does not exist')
    }
    const parameter = {
      ...defaults,
      ...config
    }
    windowRrror(parameter);
    unhandledrejection(parameter);
    error(parameter);
    httpError(parameter);
  }
})()

// 初始化
// error
// add error
// trycatch error
// 性能参数
// 错误上报
