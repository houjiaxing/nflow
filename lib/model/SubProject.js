"use strict";

//子项目的类
var subProject = module.exports;
var util = require('../util/util.js');

//新增项目
subProject.insert = function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    let current_state = aInfo.current_state;//当前状态
    let state_set = aInfo.state_set;//状态集合
    let parentProject = aInfo.parentProject;//父项目uid
    let create_time = util.getTime("yyyy-MM-dd hh:mm:ss");

}

//查询项目列表
subProject.select = function(aInfo){
    let _uid = aInfo.uid;
   
}

//修改项目
subProject.update = function(aInfo){
    let _uid = aInfo.uid;
    let name = aInfo.name || "";
    let current_state = aInfo.current_state || "";//当前状态
    let state_set = aInfo.state_set || "";//状态集合
    let parentProject = aInfo.parentProject || "";//父项目uid
    let update_time = util.getTime("yyyy-MM-dd hh:mm:ss");
}

//删除项目
subProject.del = function(aInfo){
    let _uid = aInfo.uid;

}