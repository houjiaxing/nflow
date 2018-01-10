"use strict";

//子项目的类
var subProject = module.exports;
var util = require('../util/util.js');
var db = require('../db/db.js');
var consts = require('../util/consts.js');
var project = require('./ProjectInfo');

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
        
        //校验current_state是否包含在state_set:"2,3,5"里面
        let _set = state_set.indexOf(""+current_state);
    
        if(_set == -1){
            console.log("current_state不在state_set集合中");
            return consts.MSG.DATA_WRONG;
        }
        
        //校验parentProject是否存在
        let is_ex_pro = await project.select({"uid":parentProject});

        if(is_ex_pro.errorcode && is_ex_pro.errorcode != 0 ){
            console.log("parentProject不存在");
            return consts.MSG.DATA_WRONG;
        }

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
            if(sss['affectedRows'] > 0){
                return consts.MSG.SUCCESS;
            }else{
                return consts.MSG.DATABASE_OPERATION_ERROR;
            }
            
            //history表格插入        

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
            console.log(sss.length);

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
            //history表格插入         

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
subProject.update = async function(aInfo){
    let _uid = aInfo.uid;
    let name = aInfo.name || "";
    let current_state = aInfo.current_state || "";//当前状态
    let state_set = aInfo.state_set || "";//状态集合
    let parentProject = aInfo.parentProject || "";//父项目uid
    let update_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    let is_block = aInfo.is_block || 0;//0是正常 1是block
    let block_message = aInfo.block_message || "";

    //校验数据是否为空,校验数据的合法性
    if(!_uid){
        console.log("没有uid");
        return consts.MSG.DATA_WRONG;
    }
    
    if(!name && !current_state && !state_set && !parentProject && !is_block && !block_message){
        //数据都是空
        console.log("数据都是空的，没有做任何修改");
        return consts.MSG.DATA_WRONG;
    }
    
    //确认此uid的项目是否存在
    let _project = await subProject.select({"uid":_uid});
    if(_project.errorcode && _project.errorcode != 0){
        console.log("不存在此uid且status等于0的项目");
        return consts.MSG.DATA_NOT_EXIST;
    }

    //state_set是否在模板中
    if(state_set){

    }
    

    //current_state必须在state_set里面
    if(current_state){
     
        let _set = _project["state_set"].indexOf(""+current_state);
        
        if(_set == -1){
            console.log("current_state不在state_set集合中");
            return consts.MSG.DATA_WRONG;
        }
        //新的state_set集合也需要校验
        if(state_set && (state_set.indexOf(""+current_state) == -1)){
            console.log("current_state不在state_set集合中");
            return consts.MSG.DATA_WRONG;
        }
    }
    

    //is_block和blcok_message必须共存亡
    if(is_block && !block_message){
        console.log("is_block和blcok_message必须共存亡");
        return consts.MSG.DATA_WRONG;
    }
    if(!is_block && block_message){
        console.log("is_block和blcok_message必须共存亡");
        return consts.MSG.DATA_WRONG;
    }

    //parentProject是否真实存在
    if(parentProject){
        let is_ex_pro = await project.select({"uid":parentProject});

        if(is_ex_pro.errorcode && is_ex_pro.errorcode != 0 ){
            console.log("parentProject不存在");
            return consts.MSG.DATA_WRONG;
        }
    }
    
    
    //拼接数据
    let _params = [];
    if(name){
        _params["name"] = name;
    }
    if(current_state){
        _params["current_state"] = current_state;
    }
    if(state_set){
        _params["state_set"] = state_set;
    }
    if(parentProject){
        _params["parentProject"] = parentProject;
    }
    if(is_block){
        _params["is_block"] = is_block;
        _params["block_message"] = block_message;
    }
    _params["update_time"] = update_time;
   
    let updateObj = {
        tableName: table_name,
        params: _params,
        where: {
            uid: _uid,
            status:consts.status.normal
        }
    };

    try {
        let conn = await db.connection(consts.db);

        let res = await db.update(conn, updateObj);

        let sss = res[0];
        
        if(sss['affectedRows']>0){
            return consts.MSG.SUCCESS;
        }else{
            return consts.MSG.DATABASE_OPERATION_ERROR;
        }

    } catch (error) {
        console.error(error);
        return consts.MSG.DATABASE_ERROR;
    }
    //history表格插入

}

//删除项目
subProject.del = async function(aInfo){
    let _uid = aInfo.uid;
    let update_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    //校验是否存在此项目
    if(_uid){
        let deleteObj = {
            tableName: table_name,
            params: {
                status: consts.status.abnormal,//软删除
                update_time: update_time
            },
            where: {
                uid: _uid,
                status:consts.status.normal
            }
        }

         try {
            let conn = await db.connection(consts.db);

            let res = await db.update(conn, deleteObj);
            
            let sss = res[0];
            
            if(sss['affectedRows'] > 0){
                return consts.MSG.SUCCESS;
            }else{
                console.log("软删除失败，uid可能不存在");
                return consts.MSG.DATABASE_OPERATION_ERROR;
            }
            //history表格插入


        } catch (error) {
            console.error(error);
            return consts.MSG.DATABASE_ERROR;
        }
    }
    else{
        return consts.MSG.DATA_WRONG;
    }
}