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
status.insert = function (aInfo) {
    let _uid = util.getUuid();
    let name = aInfo.name;
    let time = util.getTime('yyyy-MM-dd hh:mm:ss');
    let array = [_uid,name,time];
    if (name) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = `insert into status_collections (uid,name,create_time) values (?,?,?)`;
                let conn = await db.connectionPool();
                let result = await conn.execute(sql, array);
                if (result[0]["affectedRows"]>0){
                    resolve(consts.MSG.SUCCESS);
                }
                else{
                    resolve(consts.MSG.DATABASE_NO);
                }
            } catch (error) {
                console.log('新增状态集合数据库操作错误:' + error);
                reject(consts.MSG.DATABASE_ERROR);
            }
        });

    } else {
        return consts.MSG.DATA_WRONG;
    }
}


/**
 * @author Luke
 * @example var d = {column : ["name","create_time"],uid:"87BAE0B0F51111E79118115628041711"};
 *          status.select().then(function(w){
 *              console.log(w);
 *          });
 * 已完成
 */
status.select = function (aInfo) {
    let column,where,sql;
    let array = [];
    column= aInfo.column;
    array.push(aInfo.uid);
    let conn =  db.connection(consts.db);
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `select `+column+` from status_collections where uid = ? and status = 0`;
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, array);
            resolve(result[0]);
        } catch (error) {
            console.log('查询状态集合数据库操作错误:' + error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });


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
    let upd = "";
    let array = [];
    array.push(_uid);
    for (let keys in params){
        upd += " " + keys + "='" + params[keys] + "',";
    }
    upd = upd.substring(0, upd.length - 1);
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `update status_collections set `+upd+` where uid = ?`;
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, array);
            if (result[0]["affectedRows"]>0){
                resolve(consts.MSG.SUCCESS);
            }
            else{
                resolve(consts.MSG.DATABASE_NO);
            }
        } catch (error) {
            console.log('查询状态集合数据库操作错误:' + error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });
}