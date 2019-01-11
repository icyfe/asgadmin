const mysql = require('mysql');
const {config} = require('./config');
let connection = mysql.createConnection(config);
console.log(config)
connection.connect();
class Sql {
    query(sql, value = '') {
        return new Promise((res, rej) => {
            connection.query(sql, (err, ret) => {
                if (err) {
                    rej(err.message);
                } else {
                    res(ret);
                }
            })
        })
    }
    delete(sql, value = '') {
        return new Promise((res, rej) => {
            connection.delete(sql, (err, ret) => {
                if (!err) {
                    res(ret);
                    return;
                }
                rej(err.message);
            })
        })
    }
    endSql(){
        connection.end();
    }
}
module.exports = {Sql }