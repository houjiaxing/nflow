const mysql = require('mysql2/promise');
var consts = require('../util/consts');

/**
 * 创建数据库连接池
 * @param {*} conn 
 */
exports.connectionPool = function () {
    return new Promise((resolve, reject) => {
        try {
            resolve(mysql.createPool(consts.db));
        } catch (error) {
            reject(error);
        }
    });
}