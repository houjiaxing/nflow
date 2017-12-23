const uuidv1 = require('uuid/v1');



//获取uuid
module.exports = function getUuid(){
    return uuidv1();
}

/**
 * 提取当前系统时间
 * @author Luke
 * @param {string} fmt 
 * @example getTime("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 ;
 * @example getTime("yyyy-MM-dd hh:mm:ss") ==> 2006-07-02 08:09:04 ;
 * @example getTime("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 ;
 * @returns {string} 

 */
module.exports = function getTime(fmt) {
    var today = new Date();
    var o = {
        "M+": today.getMonth() + 1,
        "d+": today.getDate(),
        "h+": today.getHours(),
        "m+": today.getMinutes(),
        "s+": today.getSeconds(),
        "q+": Math.floor((today.getMonth() + 3) / 3),
        "S": today.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (today.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}