"use strict";

//子项目的类
var subProject = module.exports;
var util = require('../util/util.js');
var db = require('../db/db.js');
var consts = require('../util/consts.js');
var project = require('./ProjectInfo');
var Status = require('./Status');

let table_name = "sub_project";

//新增项目
/*
 *@example var d = {name :"xxxx",current_state:1,state_set:"1,2,3",parentProject:"xascasdcas"};
 *          subproject.insert(d).then(function(w){
 *              console.log(w);
 *          });
*/
subProject.insert = async function(aInfo){

    let _uid = util.getUuid();
    let name = aInfo.name;
    let current_state = aInfo.current_state;//当前状态
    let state_set = aInfo.state_set;//状态集合
    let parentProject = aInfo.parentProject;//父项目uid
    let create_time = util.getTime("yyyy-MM-dd hh:mm:ss");
    //校验数据的合法性
    if(!name || !current_state || !state_set || !parentProject){
        return consts.MSG.DATA_WRONG;
    }

    let _check = await subProject.check_current_state(current_state,state_set,parentProject);
    if(!_check){
        return consts.MSG.DATA_WRONG;
    }
    

    let dataArray = [_uid,name,create_time,current_state,state_set,parentProject];

    let keys = "uid,name,create_time,current_state,state_set,parentProject";

    let sql = "insert into "+table_name+" ("+keys+") values (?,?,?,?,?,?)";

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
 *          subproject.select(d).then(function(w){
 *              console.log(w);
 *          });
*/
subProject.select = async function(aInfo){
    let _uid = aInfo.uid;
    let column = aInfo.column || "";

    if(!_uid){
        return consts.MSG.DATA_WRONG;
    }
    if(!column){
        column = ["name","current_state","state_set","parentProject","create_time","is_block","block_message","update_time"];
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
 *@example var d = {"uid":"AB02FCE0F50911E7A250F1EF9AC04A11","params":{"name":"cd"}};
 *          subproject.update(d).then(function(w){
 *              console.log(w);
 *          });
*/
subProject.update = async function(aInfo){
    let _uid = aInfo.uid;
    let params = aInfo.params || {};

    //校验数据是否为空,校验数据的合法性
    if(!_uid){
        console.log("没有uid");
        return consts.MSG.DATA_WRONG;
    }

     //校验数据是否为空
    if(!_uid || Object.keys(params).length == 0){
        console.log("数据都是空的，没有做任何修改");
        return consts.MSG.DATA_WRONG;
    }

    //确认此uid的项目是否存在
    let _project = await subProject.select({"uid":_uid});
    if(_project.errorcode && _project.errorcode != 0){
        console.log("不存在此uid且status等于0的项目");
        return consts.MSG.DATA_NOT_EXIST;
    }

   
    let _check = await subProject.check_current_state(params.current_state,params.state_set,params.parentProject);
    if(!_check){
        return consts.MSG.DATA_WRONG;
    }

    let is_block = params.is_block || "";
    let block_message = params.block_message || "";
    //is_block和blcok_message必须共存亡
    if(is_block && !block_message){
        console.log("is_block和block_message必须共存亡");
        return consts.MSG.DATA_WRONG;
    }
    if(!is_block && block_message){
        console.log("is_block和block_message必须共存亡");
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
                //history表格插入
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
 *          subproject.del(d).then(function(w){
 *              console.log(w);
 *          });
*/
subProject.del = async function(aInfo){
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

//subproject  参数校验方法
subProject.check_current_state = async function(current_state,state_set,parentProject){

    if(state_set){
        //校验state_set是否合理,以及是否有重复字段
        let _sets = state_set.split(",");

        if(util.isRepeat(_sets)){
            console.log("有重复字段");
            return false;
        }

        let len = _sets.length;
        
        for(let i = 0;i<len;i++){
            let _tmp = _sets[i];
            let _status = await Status.select({"uid":_tmp,"column": ["name"]});

            if(_status.errorcode && _status.errorcode != 0){
                console.log("state_set不在合理模板中");
                return false;
                
            }
        }
    }
    
    
    if(current_state){
        //校验current_state是否包含在state_set:"2,3,5"里面
        let _set = state_set.split(",");

        if(!util.inArray(current_state,_set)){
            console.log("current_state不在state_set集合中");
            return false;
        }
    }
   
        
    if(parentProject){
        //校验parentProject是否存在
        let is_ex_pro = await project.select({"uid":parentProject});
        if(is_ex_pro.errorcode && is_ex_pro.errorcode != 0 ){
            console.log("parentProject不存在");
            return false;
        }
    }
        

    return true;
}