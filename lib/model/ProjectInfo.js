"use strict";

//项目的类
var projectInfo = module.exports;
var util = require('../util/util.js');


//新增项目
projectInfo.insert = function(aInfo){

    let _uid = util.getUuid(1);
    console.log(_uid);
    // let name = aInfo.name;

    
}

//查询项目列表
projectInfo.select = function(aInfo){
    let _uid = aInfo.uid;

}

//修改项目
projectInfo.update = function(aInfo){
    let _uid = aInfo.uid;
}

//删除项目
projectInfo.del = function(aInfo){
    let _uid = aInfo.uid;
}

projectInfo.insert("ss");