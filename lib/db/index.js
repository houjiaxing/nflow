const db = require("./db");

let d = {
    "host": "localhost",
    "user": "root",
    "password": "12345678",
    "database": "test",
}

let selectObj = {
    tableName: "user",
    column: ["uemail"],
    where: {
        uid: "030d4120e25411e7bd670769a2416c9e"
    }
}


let insertObj = {
    tableName: "user",
    params: {
        uid: "hdsiu",
        uemail: "211",
        upwd: "uidaks"
    }
}

let updateObj = {
    tableName: "user",
    params: {
        uemail: "7878979",
        upwd: "123"
    },
    where: {
        uid: "hdsiu"
    }
}

let deleteObj = {
    tableName: "user",
    where: {
        uid: "hdsiu"
    }
}
// let conn = db.connection(d);
// let res = db.select(d, select);

async function main() {
    console.log("===========");
    try {
        let conn = await db.connection(d);
        // let res = await db.insert(conn, insertObj);
        // let res = await db.update(conn, updateObj);
        let res = await db.select(conn, selectObj);
        // let res = await db.delete(conn, deleteObj);
        console.log(res[0]);
    } catch (error) {
        console.error(error);
    }
}

main();