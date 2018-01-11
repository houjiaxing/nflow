"use strict";

//项目的类
var projectInfo = module.exports;
var util = require('../util/util.js');
let db = require('../db/db.js');
var consts = require('../util/consts.js');

let table_name = "project";

//新增项目
/*
 *@example var d = {name :"xxxx"};
 *          project.insert(d).then(function(w){
 *              console.log(w);
 *          });
*/
projectInfo.insert = function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    let create_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    //校验数据是否为空
    if(!name){
        return consts.MSG.DATA_WRONG;
    }

    let dataArray = [_uid,name,create_time];

    let keys = "uid,name,create_time";

    let sql = "insert into "+table_name+" ("+keys+") values (?,?,?)";

    return new Promise(async (resolve, reject) => {
        try {
            
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, dataArray);
            if (result[0]["affectedRows"]>0){
                resolve(consts.MSG.SUCCESS);
            }
            else{
                resolve(consts.MSG.DATABASE_OPERATION_ERROR);
            }
        } catch (error) {
            console.log('新增状态集合数据库操作错误:' + error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });

    
}

//查询项目列表
/*
 *@example var d = {column : ["name","create_time"],uid:"87BAE0B0F51111E79118115628041711"};
 *          project.select(d).then(function(w){
 *              console.log(w);
 *          });
*/
projectInfo.select = function(aInfo){
    let _uid = aInfo.uid;
    let column = aInfo.column || "";


    if(!_uid){
        return consts.MSG.DATA_WRONG;
    }
    if(!column){
        column = ["name","create_time","update_time"];
    }

    let dataArray = [];
    dataArray.push(_uid);

    let sql = "select "+column+" from "+table_name+" where uid = ? and status = "+consts.status.normal;
    
    return new Promise(async (resolve, reject) => {
        
        try {
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, dataArray);
        
            if(result[0].length > 0){
                resolve(result[0]);
            }
            else{
                resolve(consts.MSG.DATA_NOT_EXIST);
            }
            
        } catch (error) {
            console.log('查询状态集合数据库操作错误:' + error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });
}

//修改项目
/*
 *@example var d = {"uid":"AB02FCE0F50911E7A250F1EF9AC04A11","params":{name:"cd"}};
 *          project.update(d).then(function(w){
 *              console.log(w);
 *          });
*/
projectInfo.update = function(aInfo){
    let _uid = aInfo.uid;
    let params = aInfo.params || {};
    
    //校验数据是否为空
    if(!_uid || Object.keys(params).length == 0){
        return consts.MSG.DATA_WRONG;
    }
    let dataArray = [];
    dataArray.push(_uid);

    let _upt = "";
    for (let keys in params){
        _upt += " " + keys + "='" + params[keys] + "',";
    }
    _upt = _upt.substring(1, _upt.length - 1);
    

    let sql = "update "+table_name+" set "+_upt+" where uid = ? and status = "+consts.status.normal;
    
    return new Promise(async (resolve, reject) => {
        try {
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, dataArray);
            if (result[0]["affectedRows"]>0){
                resolve(consts.MSG.SUCCESS);
            }
            else{
                resolve(consts.MSG.DATABASE_OPERATION_ERROR);
            }
        } catch (error) {
            console.log('更新状态集合数据库操作错误:' + error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });
   
}

//删除项目
/*
 *@example var d = {"uid":"AB02FCE0F50911E7A250F1EF9AC04A11"};
 *          project.del(d).then(function(w){
 *              console.log(w);
 *          });
*/
projectInfo.del = function(aInfo){
    let _uid = aInfo.uid;

    //校验是否存在此项目
    if(!_uid){
        return consts.MSG.DATA_WRONG;
    }

    let dataArray = [];
    dataArray.push(_uid);

    let _upt = "status = "+consts.status.abnormal;

    let sql = "update "+table_name+" set "+_upt+" where uid = ? and status = "+consts.status.normal;

     return new Promise(async (resolve, reject) => {
        try {
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, dataArray);
            if (result[0]["affectedRows"]>0){
                resolve(consts.MSG.SUCCESS);
            }
            else{
                resolve(consts.MSG.DATABASE_OPERATION_ERROR);
            }
        } catch (error) {
            console.log('删除状态集合数据库操作错误:' + error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });

}