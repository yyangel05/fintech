var express = require("express"),
app = express();

app.set('views', __dirname +'/views' ,module= "C:\Users\NTGAYEON\git\fintech\app\node_modules\ejs\index");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = process.env.PORT ||3000;
app.use(express.static(__dirname+'/public'))

var request = require("request");

//DB설정
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost', //127.0.0.1
    user : 'root',
    password : 'mysrkdus2@',
    database : 'fintech'
});
connection.connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//
app.get('/main', function(req, res) {
    //res.send('HELLO EXPRESS');
    res.render('index');
})
app.get('/gallery', function(req, res) {
    res.render('gallery-collections');
})

app.get('/join', function(req, res) {
    res.render('join');
})

app.listen(port);
console.log("Listening on port", port);

//데이터 받는 코드만들기
app.post('/join', function(req, res) {

    console.log(req.body);

    var name = req.body.name;
    var birth = req.body.birth
    var user_id = req.body.email;
    var user_password = req.body.password;
    var phone = req.body.phone;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var useseqnum = req.body.useseqnum;

    console.log(name, birth, user_id, user_password, phone);
    var sql = "INSERT INTO `fintech`.`user` (`name`, `birth`, `user_id`, `user_password`, `phone`,`accessToken`, `refreshToken`, `useseqnum`) VALUES (?,?,?,?,?,?,?,?);";
    connection.query(sql,[name, birth, user_id, user_password, phone, accessToken, refreshToken, useseqnum], function(error, results) {
        if(error) throw error;
        else {
            console.log(this.sql);
            res.json(1);
        }
    });
}) 

app.get('/ajaxTest', function(req, res) {
    //console.log('ajax call');
    var result = "hello";
    res.json(result);
})

app.get('/authResult', function(req, res) {
    var auth_code = req.query.code;
   // var auth_code = "352fb87a-91e9-4e94-96c0-27534978c2cb";
    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";
    var option = {
        method : "POST",
        url :getTokenUrl,
        headers : {
        },
        form : {
            code : auth_code,
            client_id : "l7xx697de99a02da4106a23d66c1d088e83a",
            client_secret : "090432f742e6422dad18fcef9ab103e0",
            redirect_uri : "http://localhost:3000/authResult",
            grant_type : "authorization_code"
        }
    };

    request(option, function(err, response, body){
        if(err) throw err;
        else {
            console.log(body);
            var accessRequestResult = JSON.parse(body);
            console.log(accessRequestResult);
            res.render("resultChild", {data : accessRequestResult})
        }
    })
})