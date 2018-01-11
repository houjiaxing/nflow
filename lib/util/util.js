const uuidv1 = require('uuid/v1');

util = module.exports;

/**
 * 提取uuid（时间戳）
 * @author Luke
 * @returns {string} 
 */
util.getUuid =  function(){
    return uuidv1().replace(/\-/g, "").toUpperCase();
}

/**
 * 提取当前系统时间
 * @author Luke
 * @param {string} fmt 
 * @example getTime("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 ;
 * @example getTime("yyyy-MM-dd hh:mm:ss") ==> 2006-07-02 08:09:04 ;
 * @example getTime("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 ;
 * @example getTime("timestamp") ==> 1514019358
 * @returns {string} 

 */
util.getTime = function(fmt) {
    if(fmt == null){
        return -1;
    }
    if(fmt == 'timestamp'){
        return parseInt(Date.now()/1000);
    }
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


/**
 * 判断数组中是否有重复元素
 * @author Luke
 * @param {Array} arr 
 * @example let arr = ["1","2","2"];
 *          util.isRepeat(arr);
 * @returns {bool} 

 */
util.isRepeat = function(arr){
    let hash = {};
    for (let i in arr){
        if(hash[arr[i]])
        return true;
        hash[arr[i]] = true;
    }
    return false;
}


/**
 * 判断数组中是否有重复元素
 * @author Luke
 * @param {string} str
 * @param {Array} arr 
 * @example let str = "1";
 *          let arr = ["1","2","2"];
 *          console.log(util.inArray(str,arr));
 * @returns {bool} 

 */
util.inArray = function(str,arr){
    let i = arr.length;
    while(i--){
        if(arr[i] === str){
            return true;
        }
    }
    return false;
}