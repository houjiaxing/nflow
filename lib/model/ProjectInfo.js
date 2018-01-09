"use strict";

//项目的类
var projectInfo = module.exports;
var util = require('../util/util.js');
var db = require('../db/db.js');
var consts = require('../util/consts.js');

//新增项目
projectInfo.insert = function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    //校验数据是否为空
    if(name){
        //校验是否已有项目

    }else{
        return consts.MSG.DATA_WRONG;
    }
}

//查询项目列表
projectInfo.select = async function(aInfo){
    let _uid = aInfo.uid;
    if(_uid){
        let selectObj = {
            tableName: "project",
            column: ["uid","name"],
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
                result['uid'] = sss[0].uid;
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
projectInfo.select({"uid":"aa"});

//修改项目
projectInfo.update = function(aInfo){
    let _uid = aInfo.uid;
    let name = aInfo.name || "";
    let update_time = util.getTime();
    //校验数据是否为空
    if(_uid && name){

    }
    else{
        return consts.MSG.DATA_WRONG;
    }
}

//删除项目
projectInfo.del = function(aInfo){
    let _uid = aInfo.uid;
    //校验是否存在此项目
    if(_uid){

    }
    else{
        return consts.MSG.DATA_WRONG;
    }
}