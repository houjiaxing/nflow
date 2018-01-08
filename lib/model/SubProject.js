"use strict";

//子项目的类
var subProject = module.exports;
var util = require('../util/util.js');
let apiList = [];

//入口
subProject.control = function(aInfo){
    //走base类方法

}


//新增项目
subProject.insert = function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    let current_state = aInfo.current_state;//当前状态
    let state_set = aInfo.state_set;//状态集合
    let parentProject = aInfo.parentProject;//父项目uid
    let create_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    let is_block = 0;//0是正常 1是block
    let block_message = "";
    //校验数据的合法性
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
    let is_block = aInfo.is_block || 0;//0是正常 1是block
    let block_message = aInfo.block_message || "";
    //校验数据是否为空
    //校验数据的合法性
    
}

//删除项目
subProject.del = function(aInfo){
    let _uid = aInfo.uid;
    //校验是否存在此项目
}

apiList['subProject_insert'] = subProject.insert;
apiList['subProject_select'] = subProject.select;
apiList['subProject_update'] = subProject.update;
apiList['subProject_del'] = subProject.del;