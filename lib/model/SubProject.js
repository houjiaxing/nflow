"use strict";

//子项目的类
var subProject = module.exports;
var util = require('../util/util.js');
var db = require('../db/db.js');
var consts = require('../util/consts.js');

let table_name = "sub_project";

//新增项目
subProject.insert = async function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    let current_state = aInfo.current_state;//当前状态
    let state_set = aInfo.state_set;//状态集合
    let parentProject = aInfo.parentProject;//父项目uid
    let create_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    //校验数据的合法性
    if(name && current_state && state_set && parentProject){
        let insertObj = {
            tableName: table_name,
            params: {
                uid: _uid,
                name: name,
                create_time:create_time,
                current_state:current_state,
                state_set:state_set,
                parentProject:parentProject
            }
        }

        try {
            let conn = await db.connection(consts.db);

            let res = await db.insert(conn, insertObj);
            
            let sss = res[0];
            if(sss.length > 0 && sss['affectedRows']>0){
                return consts.MSG.SUCCESS;
            }else{
                return consts.MSG.DATABASE_OPERATION_ERROR;
            }

                       

        } catch (error) {
            console.error(error);
            return consts.MSG.DATABASE_ERROR;
        }

    }
    else{
        return consts.MSG.DATA_WRONG;
    }
}

//查询项目列表
subProject.select = async function(aInfo){
    let _uid = aInfo.uid;
    if(_uid){
        let selectObj = {
            tableName: table_name,
            column: ["name","current_state","state_set","parentProject","create_time","is_block","block_message","update_time"],
            where: {
                uid: _uid,
                status:consts.status.normal
            }
        }
        let result = [];

        try {
            let conn = await db.connection(consts.db);

            let res = await db.select(conn, selectObj);

            let sss = res[0];
            
            if(sss.length > 0){//没有当前数据
                result['uid'] = _uid;
                result['name'] = sss[0].name;
                result['current_state'] = sss[0].current_state;
                result['state_set'] = sss[0].state_set;
                result['parentProject'] = sss[0].parentProject;
                result['create_time'] = sss[0].create_time;
                result['is_block'] = sss[0].is_block;
                result['block_message'] = sss[0].block_message;
                result['update_time'] = sss[0].update_time;

                return result;
            }
            else{
                return consts.MSG.DATA_NOT_EXIST;
            }
                       

        } catch (error) {
            console.error(error);
            return consts.MSG.DATABASE_ERROR;
        }
    }
    else{
        return consts.MSG.DATA_WRONG;
    }
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