var express = require("express"),
app = express();

app.set('views', __dirname +'/views' ,module= "C:\Users\NTGAYEON\git\fintech\app\node_modules\ejs\index");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = process.env.PORT ||3000;
app.use(express.static(__dirname+'/public'))

var request = require("request");
var jwt = require('jsonwebtoken');
var tokenKey = 'f$i1nt#ec1hT@oke1n!Key';
var auth = require('./lib/auth');
var cors = require('cors');

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
app.use(cors());

//
//app.get('/main', function(req, res) {
    //res.send('HELLO EXPRESS');
   // res.render('index');
//})
app.get('/gallery', function(req, res) {
    res.render('gallery-collections');
})

app.get('/join', function(req, res) {
    res.render('join');
})

app.get('/login', function(req, res) {
    res.render('login');
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
    var userseqnum = req.body.userseqnum;

    console.log(name, birth, user_id, user_password, phone);
    var sql = "INSERT INTO `fintech`.`user` (`name`, `birth`, `user_id`, `user_password`, `phone`,`accessToken`, `refreshToken`, `userseqnum`) VALUES (?,?,?,?,?,?,?,?);";
    connection.query(sql,[name, birth, user_id, user_password, phone, accessToken, refreshToken, userseqnum], function(error, results) {
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

//내가 짠 login코드
app.post('/login',function(req,res) {
    var login_id = req.body.email;
    var login_password = req.body.password;

    var sql = "select * from user where user_id =?";
    connection.query(sql,[login_id],function(error, results) {
        if(error) throw error;
        else {
            console.log('패스워드'+ results[0].user_password);

            if(login_password == results[0].user_password) {
                jwt.sign(
                    {
                        userName : results[0].name,
                        userId : results[0].user_id
                    },
                    tokenKey,
                    {
                        expiresIn : '1d',
                        issuer : 'fintech.admin',
                        subject : 'user.login.info'
                    },
                    function(err, token) {
                        console.log('로그인 성공',token);
                        res.json(token);
                    }
                )
            }
            else {
                res.json('등록정보가 없습니다');
            }
        }
    });  
})

app.get('/main', function(req, res) {
    res.render('main');
})

//발급된 토큰과 유저가 일치하는지 확인하는 실습
app.post('/getUser', auth, function(req, res) {
    var userId = req.decoded.userId;
    var sql = "select userseqnum, accessToken from user where user_id=?";
    connection.query(sql, [userId], function(err, result) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            var option ={
                method : "GET",
                url :'https://testapi.open-platform.or.kr/user/me?user_seq_no='+ result[0].userseqnum,
                headers : {
                    'Authorization' : 'Bearer ' + result[0].accessToken
                }
            };
            request(option, function(err, response, body) {
                if(err) throw err;
                else {
                    console.log(body);
                    res.json(JSON.parse(body));
                }
            })
        }
    })
})

app.get('/tokenTest', auth, function(req,res) {
    console.log(req.decoded);
})

//잔액조회 실습
app.get('/balance', function(req, res) {
    res.render('balance');
})

app.post('/balance', auth, function(req, res) {
    var userId = req.decoded.userId;
    var sql = "select userseqnum, accessToken from user where user_id=?";
    var finNum = req.body.finNum;
    connection.query(sql, [userId], function(err, result) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            var option ={
                method : "GET",
                url :'https://testapi.open-platform.or.kr/v1.0/account/balance?fintech_use_num='+finNum+'&tran_dtime=20190521101921',
                //url :'https://testapi.open-platform.or.kr/v1.0/account/balance?fintech_use_num='+ req.decoded.fintech_use_num +'&tran_dtime=20161111111111', 
                headers : {
                    'Authorization' : 'Bearer ' + result[0].accessToken
                }
            };
            request(option, function(err, response, body) {
                if(err) throw err;
                else {
                    console.log(body);
                    res.json(JSON.parse(body));
                    //res.render('balance', {data : JSON.parse(body)})
                }
            })
        }
    })    
})

//거래내역조회 실습
app.post('/transaction_list', auth, function(req, res) {    
    var userId = req.decoded.userId;
    var sql = "select userseqnum, accessToken from user where user_id=?";
    var finNum = req.body.finNum;
    //var inquiry_type = req.body.inquiry_type;
    connection.query(sql, [userId], function(err, result) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            var option ={
                method : "GET",
                url :'https://testapi.open-platform.or.kr/v1.0/account/transaction_list?fintech_use_num='+finNum+
                    '&tran_dtime=20190521101921'+'&inquiry_type=A'+'&from_date=20160101'+'&to_date=20170101'+
                    '&sort_order=D'+'&page_index=1' ,
                headers : {
                    'Authorization' : 'Bearer ' + result[0].accessToken
                }
            };
            request(option, function(err, response, body) {
                if(err) throw err;
                else {
                    console.log(body);
                    res.json(JSON.parse(body));
                }
            })
        }
    })    
})
      
//계좌조회 연습용으로 써본 코드
/*
app.get('/myAccount', auth, function(req, res) {
    var userId = req.decoded.userId;
    var sql = "select userseqnum, accessToken from user where user_id=?";
    connection.query(sql, [userId], function(err, result) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            var option ={
                method : "GET",
                url :'https://testapi.open-platform.or.kr/user/me?user_seq_no='+ result[0].userseqnum,
                headers : {
                    'Authorization' : 'Bearer ' + result[0].accessToken
                }
            };
            request(option, function(err, response, body) {
                if(err) throw err;
                else {
                    console.log(body);
                }
            })
        }
    })
})*/
