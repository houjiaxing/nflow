"use strict";

//项目的类
var status = module.exports;

var util = require('../util/util');
var consts = require('../util/consts');

var db = require('../db/db');

/**
 * @author Luke
 * @param {Object} aInfo 传入数据 
 * @example var d = {name : "tece"};
            status.insert(d).then(function(w){
                console.log(w);
            });
 * 已完成
 */
status.insert = async function (aInfo) {
    let _uid = util.getUuid();
    let name = aInfo.name;
    let time = util.getTime('yyyy-MM-dd hh:mm:ss');
    if (name) {
        let insertObj = {
            tableName: "status_collections",
            params: {
                uid: _uid,
                name: name,
                create_time: time
            }
        }
        try {
            let conn = await db.connection(consts.db);
            let res = await db.insert(conn, insertObj);
            if (res[0]['affectedRows'] > 0) {
                return consts.MSG.SUCCESS;
            } else {
                console.log("本次插入操作影响了" + res[0]['affectedRows'] + "行");
                return consts.MSG.DATABASE_NO;
            }
        } catch (error) {
            console.log('新增状态集合数据库操作错误:' + error);
            return consts.MSG.DATABASE_ERROR;
        }


    } else {
        return consts.MSG.DATA_WRONG;
    }
}


/**
 * @author Luke
 * @example var d = {column:["name"],uid:"87BAE0B0F51111E79118115628041711"};
 *          status.select().then(function(w){
 *              console.log(w);
 *          });
 * 已完成
 */
status.select = async function (aInfo) {
    let column,where;
    if(aInfo){
        if(aInfo.uid){
            where = {uid:aInfo.uid,status:0};
        }
        else{
            where = {status:0};
        }
        if(aInfo.column){
            column = aInfo.column;
        }
        else{
            column = ["*"];
        }
    }
    else{
        column = ["*"];
        where = {status:0};
    }
    let selectObj = {
        tableName: "status_collections",
        column: column,
        where: where
    }
    try {
        let conn = await db.connection(consts.db);
        let res = await db.select(conn, selectObj);
        if(res[0].length > 0 ){
            return res[0];
        }
        else{
            return consts.MSG.DATABASE_NO;
        }
    }
    catch (error) {
        console.log('查询状态集合数据库操作错误:' + error);
        return consts.MSG.DATABASE_ERROR;
    }
}


/**
 * @author Luke
 * @param {Object} aInfo 传入数据 
 * @example var d = {"uid":"AB02FCE0F50911E7A250F1EF9AC04A11","params":{name:"cd"}};
            status.update(d).then(function(w){
                console.log(w);
            });
 * 已完成
 */
status.update = async function (aInfo) {
    let _uid = aInfo.uid;
    let params = aInfo.params;
    let time = util.getTime('yyyy-MM-dd hh:mm:ss');
    let updateObj = {
        tableName: "status_collections",
        params: params,
        where: {
            uid: _uid
        }
    }
    try {
        let conn = await db.connection(consts.db);
        let res = await db.update(conn, updateObj);
        if (res[0]['affectedRows'] > 0) {
            return consts.MSG.SUCCESS;
        } else {
            console.log("本次更新操作影响了" + res[0]['affectedRows'] + "行");
            return consts.MSG.DATABASE_NO;
        }
    } catch (error) {
        console.log('更新状态集合操作数据库错误:' + error);
        return consts.MSG.DATABASE_ERROR;
    }
}