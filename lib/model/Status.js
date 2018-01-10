"use strict";

//项目的类
var status = module.exports;

var util = require('../util/util');
var consts = require('../util/consts');

var db = require('../db/db');

/**
 * @author Luke
 * @param {Object} aInfo 传入数据 
 * @example {"name":"xxx"}
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
                return consts.MSG.DATABASE_ERROR;
            }
        } catch (error) {
            console.log('do insert status error:' + error);
            return consts.MSG.DATABASE_ERROR;
        }


    } else {
        return consts.MSG.DATA_WRONG;
    }
}


/**
 * @author Luke
 * 待完成
 */
status.select = async function () {
    let selectObj = {
        tableName: "status_collections",
        column: ["*"],
        where: {
            status: 0
        }
    }
    let statuslist = [];

    // return new Promise((resolve, reject) => {
        try {
            let conn = await db.connection(consts.db);
            let res = await db.select(conn, selectObj);
            console.log("-----" + res.length);
            if (res.length > 0) {
                for (let i = 0; i < res.length; i++) {
                    // console.log(res[i]);
                    statuslist.push(res[i]);
                }
                // console.log(statuslist);
                // resolve(statuslist);
                return statuslist;
            }
        }
        catch (error) {
            console.log('do select status error:' + error);
            // reject(error);
        }
    // });
}


/**
 * @author Luke
 * @param {Object} aInfo 传入数据 
 * @example {"uuid":"xxx"}
 * 待完成
 */
status.delete = function (aInfo) {

}