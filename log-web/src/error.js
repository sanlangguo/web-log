import { ajax } from "./ajax";

/**
 * @event windowRrror 捕捉脚本语法错误和运行时错误
 */
export function windowRrror(config) {
  window.onerror = function (msg, url, line, colno) {
    ajax({
      url: config.httpUrl,
      data: {
        ...config,
        msg, url, line, colno, type: 'onerror'
      }
    })
    // 可以捕获异步函数中的错误信息并进行处理， 提示Script error
    console.log(msg);   //捕获错误信息
    console.log(url);   //捕获出错的文件路径
    console.log(line, 'line');  //捕获错误出错的行数
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
        ms: e.reason,
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
        src: target.src,
        type: 'resource',
      }
    })
  });
}

/**
 *  @event httpError http 请求错误
 */
export function httpError() {

}