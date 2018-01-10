const mysql = require('mysql2/promise');

exports.connection = async function (conn) {
    return new Promise((resolve, reject) => {
        try {
            resolve(mysql.createConnection(conn));
        } catch (error) {
            reject(error);
        }
    });
}
/**
 * 创建数据库连接池
 * @param {*} conn 
 */
exports.connectionPool = function (conn) {
    return new Promise((resolve, reject) => {
        try {
            resolve(mysql.createPool(conn));
        } catch (error) {
            reject(error);
        }
    });
}


/**
 * 根据条件查询
 * @param {*} conn 连接数据
 * @param {*} opts 参数
 * {
 *    tableName:""
 *    column:[]
 *    where:{
 *            a:"",
 *            b:"",
 *         }
 * }
 */
exports.select = function (conn, opts) {
    let sql = "select ";
    let where = opts.where;
    let tableName = opts.tableName;
    let column = opts.column;
    let array = [];

    console.log("where--------");
    console.log(where);
    console.log("tableName--------");
    console.log(tableName);
    console.log("column----------");
    console.log(column);

    //查询哪几列
    if (column.length == 0) {
        sql += "*";
    } else {
        for (let i = 0; i < column.length; i++) {
            sql += column[i];
            if (i !== column.length - 1) {
                sql += ",";
            }
        }
    }

    sql += " from " + tableName; //表名

    if (where != undefined) {
        sql += " where true " //sql true会自动忽略掉第一个and
        //拼接查询条件
        for (let item in where) {
            sql += "and " + item + " = ? ";
            array.push(where[item]);
        }
    }
    console.log("arr = " + array);
    console.log("sql = " + sql);
    return new Promise(async (resolve, reject) => {
        try {
            let result = conn.execute(sql, array);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * 插入数据
 * @param {*} conn 连接数据
 * @param {*} opts 参数
 * {
 *  tableName:""
 *  params:{
 *           uid:"123"     
 *         }
 * }
 */
exports.insert = function (conn, opts) {
    let sql = "insert into ";
    let params = opts.params;
    let tableName = opts.tableName;
    let array = [];

    let keySQL = " (";
    let ValueSQL = "(";
    for (let item in params) {
        keySQL += item + ",";
        ValueSQL += "?,";
        array.push(params[item]);
    }
    keySQL = keySQL.substring(0, keySQL.length - 1) + ")";
    ValueSQL = ValueSQL.substring(0, ValueSQL.length - 1) + ")";

    //拼接主sql
    sql += tableName + keySQL + " values " + ValueSQL;
    console.log("sql = " + sql);
    return new Promise((resolve, reject) => {
        try {
            let result = conn.execute(sql, array);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * 修改数据
 * @param {*} conn 连接数据
 * @param {*} opts 参数
 * {
 *  tableName:"",
 *  params:{
 *           uid:"123"     
 *         },
 *  where:{
 *           uid:"123"
 *        }
 * }
 */
exports.update = function (conn, opts) {
    let tableName = opts.tableName;
    let params = opts.params;
    let where = opts.where;
    let array = [];

    let sql = "update " + tableName + " set ";

    for (let item in params) {
        sql += item + " = ?,";
        array.push(params[item]);
    }
    sql = sql.substring(0, sql.length - 1) + " where true ";

    for (let item in where) {
        sql += "and " + item + " = ? ";
        array.push(where[item]);
    }

    console.log("sql = " + sql);
    return new Promise((resolve, reject) => {
        try {
            let result = conn.execute(sql, array);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}


/**
 * 删除数据
 * @param {*} conn 连接数据
 * @param {*} opts 参数
 * {
 *  tableName:"",
 *  where:{
 *           uid:"123"
 *        }
 * }
 */
exports.delete = function (conn, opts) {
    let tableName = opts.tableName;
    let where = opts.where;
    let array = [];
    let sql = "delete from " + tableName + " where true ";

    for (let item in where) {
        sql += "and " + item + " = ? ";
        array.push(where[item]);
    }

    console.log("sql = " + sql);

    return new Promise((resolve, reject) => {
        try {
            let result = conn.execute(sql, array);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}