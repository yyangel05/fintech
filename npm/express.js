var express = require("express"),
app = express();

app.set('views', __dirname ,module= "C:\Users\NTGAYEON\git\fintech\npm\node_modules\ejs\index");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var request = require('request');
var parseString = require('xml2js').parseString;

//db커넥션
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost', //127.0.0.1
    user : 'root',
    password : 'mysrkdus2@',
    database : 'fintech'
});

var port = process.env.PORT ||8080;
//app.use(express.static(__dirname+'/'))

app.get('/main', function(req, res) {
    res.send('HELLO EXPRESS');
})

app.get('/wether', function(req, res) {
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function(error, response, body) {
    console.log('error:',error);
    console.log('statusCode:',response && response.statusCode);
    //console.log('body:',body); 
    var wetherXml = body;

    parseString(wetherXml, function (err, result) {
        //console.log(result.rss.channel[0].item[0].description[0].header[0].wf[0]);
        res.send(result.rss.channel[0].item[0].description[0].header[0].wf[0]);
    })
})
})

app.get("/sayHello", function(request, response) {
    var user_name = request.query.user_name;
    response.end("Hello "+user_name + "!");
});

app.listen(port);
console.log("Listening on port", port);



//실습과제 - DB의 USER 목록을 화면에 뿌리기
app.get('/user', function(req, res) {
    var sql = 'select * from fintech.user';
    connection.query(sql, function(error, results, fields) {
        if(error) throw error;
        res.send(results);
        //res.send(results[0].name);
    });
}) 

//프론트엔드단 ejs로 이뿌게하기
app.get('/html', function(req, res) {
    res.send('<html><body><h1>hello</h1><h4>dsfdsfdsf</h4></body></html>')
})


app.get('/ejsTest', function(req, res) {
    res.render('main');
})