var geoip = require('geoip-lite');

// 获取 ip 地址
function getIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }
  ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
  var geo = geoip.lookup(ip);
  // res.json(geo)
  console.log('geo', ip, geo);
  return {
    ip,
  };
}



module.exports = {
  getIp
};