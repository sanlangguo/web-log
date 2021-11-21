import { ajax } from "./ajax";

/**
 * @event windowRrror 捕捉脚本语法错误和运行时错误
 * 
 * @param {String}  msg    错误信息
 * @param {String}  source     出错文件
 * @param {Number}  lineno     行号
 * @param {Number}  colno      列号
 * @param {Object}  error      Error对象（对象）
 */
export function windowRrror(config) {
  window.onerror = function (msg, source, lineno, colno) {
    ajax({
      url: config.httpUrl,
      data: {
        ...config,
        msg, source, lineno, colno, type: 'onerror'
      }
    })
  }
}

/**
 * @event unhandledrejection promise error
 */
export function unhandledrejection(config) {
  window.addEventListener('unhandledrejection', function (e) {
    console.log(e, '---')
    ajax({
      url: config.httpUrl,
      data: {
        ...config,
        msg: e.reason,
        type: 'promise'
      }
    })

    // 防止默认处理（例如将错误输出到控制台）
    e.preventDefault();
  });
}

/**
 * @event error 资源加载失败或无法使用时
 */
export function error(config) {
  window.addEventListener('error', (e) => {
    const target = e.target
    console.info(e, target.tagName, 'error')
    ajax({
      url: config.httpUrl,
      data: {
        ...config,
        tagName: target.tagName,
        count: Number(target.dataset.count) || 0,
        src: target.currentSrc,
        type: 'resource',
      }
    })
  }, true);
}

/**
 *  @event httpError http 请求错误
 */
export function httpError(config) {
  var originalOpen = XMLHttpRequest.prototype.open
  var originalSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.open = function (method, url, async, username, password) {
    config.method = method
    originalOpen.call(this, method, url, async, username, password)
  }
  XMLHttpRequest.prototype.send = function (data) {
    console.log(this, data, '-- 2dadad')
    var _this = this
    var listener = function () {
      console.log(_this.status, _this, '-- event')
      if (_this.status == 200 && _this.readyState === 4) {
        console.log('response status', _this.status,_this, data)
        ajax({
          url: config.httpUrl,
          data: {
            ...config,
            responseURL: _this.currentSrc,
            response: _this.response,
            status: _this.status,
            requestData: data,
            type: 'ajax',
          }
        })
      }
      _this.removeEventListener('readystatechange', listener)
    }
    _this.addEventListener('readystatechange', listener)
    originalSend.call(this, data)
  }
}