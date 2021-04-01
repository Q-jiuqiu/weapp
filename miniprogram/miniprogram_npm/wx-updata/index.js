module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1617193698114, function(require, module, exports) {
function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(r)}function r(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],e=!0,o=!1,a=void 0;try{for(var u,i=t[Symbol.iterator]();!(e=(u=i.next()).done)&&(n.push(u.value),!r||n.length!==r);e=!0);}catch(t){o=!0,a=t}finally{try{e||null==i.return||i.return()}finally{if(o)throw a}}return n}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return n(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function e(t){return Array.isArray(t)}function o(r){return"object"===t(r)&&null!==r&&!e(r)}var a=function t(r,n,a){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};r.forEach((function(r,f){if(r!==u){var l="".concat(n,"[").concat(f,"]");o(r)?c.arrObjPath?i(r,l+(Object.keys(r).every((function(t){return/^\[\d+]$/.test(t)||c.arrObjPath}))?"":"."),a,c):i(r,l+".",a,c):e(r)?t(r,l,a):a[l]=r}}))},u=Symbol("updata empty array item"),i=function t(n){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};"string"!=typeof u&&(c=u,u="");var f=!1;if(c.arrObjPath)if(Object.keys(n).every((function(t){return/^\[\d+]$/.test(t)})))f=!0;else{if(Object.keys(n).some((function(t){return/^\[\d+]$/.test(t)})))throw new Error("wx-updata: 数组路径对象需要每个属性都是对象路径 [数组下标] 形式");f=!1}for(var l=0,y=Object.entries(n);l<y.length;l++){var b=r(y[l],2),s=b[0],v=b[1],h=""===u?s:u.endsWith("].")||f?"".concat(u).concat(s):"".concat(u,".").concat(s);o(v)?t(v,h,i,c):!c.arrCover&&e(v)?a(v,h,i,c):i[h]=v}return i},c=function(t,r){var n=t;return function(t){return t.upData=function(t,n){var e,o,a=i(t,{arrObjPath:null!==(e=r.arrObjPath)&&void 0!==e&&e,arrCover:null!==(o=r.arrCover)&&void 0!==o&&o});return r.debug&&console.log("转化后效果:",a),this.setData(a,n)},n(t)}};if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'Empty', { enumerable: true, configurable: true, get: function() { return u; } });Object.defineProperty(exports, 'objToPath', { enumerable: true, configurable: true, get: function() { return i; } });Object.defineProperty(exports, 'updataInit', { enumerable: true, configurable: true, get: function() { return c; } });
//# sourceMappingURL=wx-updata.js.map

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1617193698114);
})()
//# sourceMappingURL=index.js.map