const db = require('../db/db.js');
const util = require('../util/util.js');
const consts = require('../util/consts');

const history = module.exports;

/**
 * 插入历史记录
 * @param {Object} aInfo 传入的数据
 *   {
 *       "sub_project":"123",
 *       "new_state":1,
 *       "last_state":1,
 *       "is_block":1,
 *       "block_message":"tttt"
 *   }
 * 
 * @author DerrickZheng
 */
history.insert = function (aInfo) {
    console.log("插入历史记录：aInfo = "+JSON.stringify(aInfo));
    let sql = `insert into history_status `;
    let uid = util.getUuid();
    let sub_project = aInfo.sub_project;
    let new_state = aInfo.new_state;
    let last_state = aInfo.last_state;
    let time = util.getTime('yyyy-MM-dd hh:mm:ss');

    let arrays = [uid, sub_project, new_state, last_state, time];

    let is_block = aInfo.is_block;
    let block_message = aInfo.block_message;
    //is_block和block_message都得必须存在
    if (is_block != undefined) {
        arrays.push(is_block);
        if (block_message != undefined) {

            arrays.push(block_message);
        } else {
            return consts.MSG.DATA_WRONG;
        }
        sql += `(uid,sub_project,new_state,last_state,time,is_block,block_message) values (?,?,?,?,?,?,?)`;

    } else {
        sql += `(uid,sub_project,new_state,last_state,time) values (?,?,?,?,?)`;
    }

    return new Promise(async(resolve, reject) => {
        try {
            let conn = await db.connectionPool();
            let result = await conn.execute(sql, arrays);

            if (result[0]["affectedRows"] > 0) {
                resolve(consts.MSG.SUCCESS);
            } else {
                resolve(consts.MSG.DATABASE_NO);
            }
        } catch (error) {
            console.error(error);
            reject(consts.MSG.DATABASE_ERROR);
        }
    });
}