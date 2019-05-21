var request = require('request');
var parseString = require('xml2js').parseString;
request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function(error, response, body) {
    console.log('error:',error);
    console.log('statusCode:',response && response.statusCode);
    //console.log('body:',body); 
    var wetherXml = body;

    parseString(wetherXml, function (err, result) {
        console.log(result);
        //console.log(result.rss.channel[0].item[0].description[0].header[0].wf[0]);
    });
});

//실행 node index.js





/*
request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function(error, response, body){
    parser.parseString(body, function (err, jsonData) {
        console.log('body:',body); 
        console.log(jsonData);
    callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
    })
});
*/

//xml2js
/*
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function(err, result) {
    console.dir(result);
});
*/
//var originalxml = http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109

/*
var fs = require('fs'), xml2js = require('xml2js');


var wetherXml = body;

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/foo.xml', function(err, data) {
    parser.parseString(wetherXml, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});

*/