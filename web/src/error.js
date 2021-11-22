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
<<<<<<< HEAD
        count: Number(target.dataset && target.dataset.count) || 0,
=======
        count: Number(target.dataset.count) || 0,
>>>>>>> 1b19baf8072723d8cc6eba2cbfe9e3c14ec8c295
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
<<<<<<< HEAD
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;

  function ajaxEventTrigger(event) {
    var ajaxEvent = new CustomEvent(event, { detail: this });
    window.dispatchEvent(ajaxEvent);
  }

  var oldXHR = window.XMLHttpRequest;

  function newXHR() {
    var realXHR = new oldXHR();

    realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort'); }, false);

    realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError'); }, false);

    realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad'); }, false);

    realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart'); }, false);

    realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress'); }, false);

    realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout'); }, false);

    realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd'); }, false);

    realXHR.addEventListener('readystatechange', function () { ajaxEventTrigger.call(this, 'ajaxReadyStateChange'); }, false);


    let send = realXHR.send;
    realXHR.send = function (...arg) {
      send.apply(realXHR, arg);
      realXHR.body = arg[0];
      ajaxEventTrigger.call(realXHR, 'ajaxSend');
    }

    let open = realXHR.open;
    realXHR.open = function (...arg) {
      open.apply(realXHR, arg)
      realXHR.method = arg[0];
      realXHR.orignUrl = arg[1];
      realXHR.async = arg[2];
      ajaxEventTrigger.call(realXHR, 'ajaxOpen');
    }

    let setRequestHeader = realXHR.setRequestHeader;
    realXHR.requestHeader = {};
    realXHR.setRequestHeader = function (name, value) {
      realXHR.requestHeader[name] = value;
      setRequestHeader.call(realXHR, name, value)
    }
    return realXHR;
  }

  window.XMLHttpRequest = newXHR;

  window.addEventListener("ajaxReadyStateChange", function (e) {
    let xhr = e.detail;
    if (xhr.readyState == 4 && xhr.status == 200) {
      // xhr.getAllResponseHeaders()  响应头信息
      // xhr.requestHeader            请求头信息
      // xhr.responseURL              请求的地址
      // xhr.responseText             响应内容
      // xhr.orignUrl                 请求的原始参数地址
      // xhr.body                     post参数，（get参数在url上面）

      console.log(xhr, 'ajaxReadyStateChange');
    }
  });
=======
  var originalOpen = XMLHttpRequest.prototype.open
  var originalSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.open = function (method, url, async, username, password) {
    config.method = method
    originalOpen.call(this, method, url, async, username, password)
  }
  XMLHttpRequest.prototype.send = function (data) {
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
            // response: _this.response,
            status: _this.status,
            requestData: data,
            type: 'ajax',
          }
        })
      }
      _this.removeEventListener('readystatechange', listener) // 如何防止重复提交
    }
    _this.addEventListener('readystatechange', listener)
    originalSend.call(this, data)
  }
>>>>>>> 1b19baf8072723d8cc6eba2cbfe9e3c14ec8c295
}