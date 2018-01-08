"use strict";

//项目的类
var projectInfo = module.exports;
var util = require('../util/util.js');
let apiList = [];

//入口
projectInfo.control = function(aInfo){
    //走base类方法

}

//新增项目
projectInfo.insert = function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    //校验数据是否为空
}

//查询项目列表
projectInfo.select = function(aInfo){
    let _uid = aInfo.uid;

}

//修改项目
projectInfo.update = function(aInfo){
    let _uid = aInfo.uid;
    let name = aInfo.name;
    let update_time = util.getTime();
    //校验数据是否为空
}

//删除项目
projectInfo.del = function(aInfo){
    let _uid = aInfo.uid;
    //校验是否存在此项目
}

apiList['projectInfo_insert'] = projectInfo.insert;
apiList['projectInfo_select'] = projectInfo.select;
apiList['projectInfo_update'] = projectInfo.update;
apiList['projectInfo_del'] = projectInfo.del;