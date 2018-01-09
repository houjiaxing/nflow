"use strict";

//项目的类
var projectInfo = module.exports;
var util = require('../util/util.js');
let db = require('../db/db.js');
var consts = require('../util/consts.js');

let table_name = "project";

//新增项目
projectInfo.insert = async function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    let create_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    //校验数据是否为空
    if(name){
        let insertObj = {
            tableName: table_name,
            params: {
                uid: _uid,
                name: name,
                create_time:create_time
            }
        }

        try {
            let conn = await db.connection(consts.db);

            let res = await db.insert(conn, insertObj);
            
            let sss = res[0];
            if(sss && sss['affectedRows']>0){
                return consts.MSG.SUCCESS;
            }else{
                return consts.MSG.DATABASE_OPERATION_ERROR;
            }

                       

        } catch (error) {
            console.error(error);
            return consts.MSG.DATABASE_ERROR;
        }

    }else{
        return consts.MSG.DATA_WRONG;
    }
}

//查询项目列表
projectInfo.select = async function(aInfo){
    let _uid = aInfo.uid;
    if(_uid){
        let selectObj = {
            tableName: table_name,
            column: ["name"],
            where: {
                uid: _uid
            }
        }
        let result = [];

        try {
            let conn = await db.connection(consts.db);

            let res = await db.select(conn, selectObj);

            let sss = res[0];
            
            if(sss){//没有当前数据
                result['uid'] = _uid;
                result['name'] = sss[0].name;

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
projectInfo.update = async function(aInfo){
    let _uid = aInfo.uid;
    let name = aInfo.name || "";
    let update_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    //校验数据是否为空
    if(_uid && name){
        let updateObj = {
            tableName: table_name,
            params: {
                name: name,
                update_time: update_time
            },
            where: {
                uid: _uid
            }
        }
         try {
            let conn = await db.connection(consts.db);

            let res = await db.update(conn, updateObj);

            let sss = res[0];
            
           if(sss && sss['affectedRows']>0){
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

//删除项目
projectInfo.del = async function(aInfo){
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
                uid: _uid
            }
        }
        try {
            let conn = await db.connection(consts.db);

            let res = await db.update(conn, deleteObj);
            
            let sss = res[0];
            if(sss && sss['affectedRows']>0){
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