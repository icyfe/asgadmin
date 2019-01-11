var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'tb',
    insecureAuth: true,
    multipleStatements: true, // 允许查询多条语句
});

connection.connect();

connection.query("CALL Register('15805986999','123465','002130000',@a,@b)", function(err, rows, fields) {
    if (err) {
       throw err;
    }

    var results = rows[0];
    var row = results[0];
    console.log("Message",row, "　　count：", row);
});

connection.end();