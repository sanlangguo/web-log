
/**
 * 获取设备是安卓、IOS  还是PC端
 */
export function getDevices() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
    if (window.navigator.userAgent.match(/iPhone/gi)) {
      return 'iPhone';
    } else {
      return 'Android';
    }
  } else {
    return 'PC';
  }
}

/**
 * 获取系统版本
 */
export function getSystemVersion() {
  var ua = window.navigator.userAgent;
  if (ua.indexOf('CPU iPhone OS ') >= 0) {
    return ua.substring(ua.indexOf('CPU iPhone OS ') + 14, ua.indexOf(' like Mac OS X'));
  } else if (ua.indexOf('Android ') >= 0) {
    return ua.substr(ua.indexOf('Android ') + 8, 3);
  } else {
    return 'other';
  }
}

/**
 获取浏览器类型
*/
export function getBrowser() {
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1;
  if (isOpera) {
    return 'Opera';
  } // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE';
  } // 判断是否IE浏览器
}