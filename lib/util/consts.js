//常量数据
var consts = module.exports;

consts.MSG = {
    SUCCESS: {
        "errorcode": 0,
        "errormsg": "success"
    },
    //数据已存在
    DATA_EXIST: {
        "errorcode": -100,
        "errormsg": 'data  existed'
    },
    //当前数据不存在
    DATA_NOT_EXIST:{
        "errorcode": -101,
        "errormsg": 'data not existed'
    },
    //参数不正确
    DATA_WRONG:{
        "errorcode": -102,
        "errormsg": 'data wrong'
    }
}

//数据库配置
consts.db = {
    "host": "t.lukex.cc",
    "user": "root",
    "password": "TEce@2017",
    "database": "workflow",
}