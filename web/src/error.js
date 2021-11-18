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
        count: Number(target.dataset.count ) || 0,
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
  window.addEventListener('ajaxReadyStateChange', function (e) {
    console.log(e.detail, "httpError 1");  // XMLHttpRequest Object
  });
  window.addEventListener('ajaxAbort', function (e) {
    console.log(e.detail.responseText, "httpError 2"); // XHR 返回的内容
  });
}