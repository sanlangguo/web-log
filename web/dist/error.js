!function(){"use strict";function e(e){console.log(e,"options.httpUrl"),(e=e||{}).type=(e.type||"GET").toUpperCase(),e.dataType=e.dataType||"json";var t=function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")}(e.data),n=null;(n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange=function(){if(4==n.readyState){var t=n.status;t>=200&&t<300?e.success&&e.success(n.responseText,n.responseXML):e.fail&&e.fail(t)}},n.open("POST",e.url,!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(t)}!function(){if(window.webLog)return window.webLog;var t,n,o,r={ua:window.navigator.userAgent,browser:(n=navigator.userAgent,o=n.indexOf("Opera")>-1,o?"Opera":n.indexOf("Firefox")>-1?"FF":n.indexOf("Chrome")>-1?"Chrome":n.indexOf("Safari")>-1?"Safari":n.indexOf("compatible")>-1&&n.indexOf("MSIE")>-1&&!o?"IE":void 0),os:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)?window.navigator.userAgent.match(/iPhone/gi)?"iPhone":"Android":"PC",osVersion:(t=window.navigator.userAgent,t.indexOf("CPU iPhone OS ")>=0?t.substring(t.indexOf("CPU iPhone OS ")+14,t.indexOf(" like Mac OS X")):t.indexOf("Android ")>=0?t.substr(t.indexOf("Android ")+8,3):"other"),pageUrl:window.location.href,env:"dev",msg:"",httpUrl:"",line:"",col:"",error:""};window.WebLog=function(t){if(!t.token)throw"token does not exist";if(!t.httpUrl)throw"httpUrl does not exist";if(!t.projectName)throw"projectname does not exist";const n={...r,...t};!function(t){window.onerror=function(n,o,r,i){e({url:t.httpUrl,data:{...t,msg:n,source:o,lineno:r,colno:i,type:"onerror"}})}}(n),function(t){window.addEventListener("unhandledrejection",(function(n){console.log(n,"---"),e({url:t.httpUrl,data:{...t,msg:n.reason,type:"promise"}}),n.preventDefault()}))}(n),function(t){window.addEventListener("error",(n=>{const o=n.target;console.info(n,o.tagName,"error"),e({url:t.httpUrl,data:{...t,tagName:o.tagName,count:Number(o.dataset.count)||0,src:o.currentSrc,type:"resource"}})}),!0)}(n),function(t){var n=XMLHttpRequest.prototype.open,o=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(e,o,r,i,a){t.method=e,n.call(this,e,o,r,i,a)},XMLHttpRequest.prototype.send=function(n){var r=this,i=function(){console.log(r.status,r,"-- event"),200==r.status&&4===r.readyState&&(console.log("response status",r.status,r,n),e({url:t.httpUrl,data:{...t,responseURL:r.currentSrc,status:r.status,requestData:n,type:"ajax"}})),r.removeEventListener("readystatechange",i)};r.addEventListener("readystatechange",i),o.call(this,n)}}(n)}}()}();