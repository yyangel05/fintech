//db랑 node.js 연결하는 실습하기

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost', //127.0.0.1
    user : 'root',
    password : 'mysrkdus2@',
    database : 'fintech'
});

connection.connect();

var sql = 'select * from fintech.user';
var insertSQL = "INSERT INTO `fintech`.`user`(`name`, `birth`, `user_id`, `user_password`, `phone`) VALUES ('got', '19900606', 'got006', '1111', '010-6611-1661')";
//connection.query('select 1+1 as solution', function(error, results, fields) {
//connection.query("INSERT INTO `fintech`.`user` VALUES ('4', 'ford', '19931111', 'alice001', '1111', '010-1111-1111');", function(error, results, fields) {

connection.query(insertSQL, function(error, results, fields) {
    if(error) throw error;
    console.log('user List : ');
    console.log(results);
});

//insert query 실습
//connection.query()

connection.end();