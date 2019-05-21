console.log('hello world');
console.log('test');
console.log('test');

//변수 실습
console.log("\n\n<<<<<<<변수실습>>>>>>>");
var firstname = 'yun';
var lastName = 'gayeon';
var x = {firstname :"Hong", lastName};
console.log(x);

var y="16" + "volvo";
console.log(y);

//사칙연산 실습
console.log("\n\n<<<<<<<사칙연습실습>>>>>>>");
//더하기
function sum(p1, p2) {
    return p1+p2;
}

var x = sum(4,1);
console.log("더하기"+ x);
console.log("더하기" +sum(3,7));

//빼기
function sub(p1,p2) {
    return p1-p2;
}


//곱하기
function mul(p1, p2) {
    return p1*p2;
}

console.log("빼기" + sub(10,2));
console.log("곱하기" + mul(2,2));

//객체만들기 실습
console.log("\n\n<<<<<<객체생성실습>>>>>>>");
var car = {
    name:"flat",
    model:"500",
    weight:"850kg",
    color:"white",

    start: function() {
        console.log("engine is starting");
    },
    drive: function() {
        console.log("engine is driving");
    },    
    brake: function() {
        console.log("engine is stopping");
    },
    stop : function() {
        console.log("enginne is stoped");
    }
}

console.log(car);
//console.log(car.start);

//배열실습
console.log("\n\n<<<<<<<배열실습>>>>>>>");
var car1 = "Saab";
var car2 = "volvo";
var car3 = "bmw";
var cars = ["Saab","volvo","bmw"];
//var cars = [car1, car2, car2];
console.log(cars);
console.log(cars[0]);
console.log(cars[1]);
console.log(cars[2]);

//반복문실습
console.log("\n\n<<<<<<<반복문실습>>>>>>>");

var cars = ["Saab","volvo","bmw","ford","fiat","audi"];
var text = "";
var i;
for(i=0; i<cars.length; i++) {
    console.log("자동차" + cars[i]);
}

var fruit = ["apple","banana","kiwi","avocado","grape"];
for(i=0; i<fruit.length; i++) {
    console.log("과일" + fruit[i]);
}

//반복문 실습

console.log("\n\n<<<<<<<반복문실습>>>>>>>");
for(i=0; i<cars.length; i++) {
    if(cars[i] == 'bmw') {
        console.log("bmw가 맞습니다");
    }
    else {
        console.log("bmw가 아닙니다");
    }
    //console.log(cars[i]);
}

//비동기 동기 실습
//동기 async
var fs = require('fs');

console.log('첫번째 기능입니다.');
fs.readFile('test.txt', 'utf8', function(err, result) {
    if(err){
        console.error(err);
        throw err;
    }
    else {
        console.error("두번째 기능인데 파일을 읽어오느리 시간이 조금 걸려요...")
        console.log(result);
    }
});
console.log('마지막 기능입니다');
console.log('마마지막 기능입니다');
console.log('마마마지막 기능입니다');
 
//비동기 sync
var fs = require('fs');

console.log('A');

var result = fs.readFileSync('test.txt', 'utf8');

console.log(result);
console.log('C');


//콜백함수 실습
console.log("\n\n<<<<<<<콜백함수 실습>>>>>>>");
function callbackFunc(callback) {
    fs.readFile('test.txt','utf8',function(err,result) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            console.error("두번째 기능인데 파일을 읽어오느리 시간이 조금 걸려요...");
            callback(result);
        }
    });
}

console.log("A");
callbackFunc(function(data) {
    console.log(data);
    console.log("C");
})

//콜백함수의문제점 -> 순차로 부르려니 줄이 너무 길어짐
//callback hell이라 부름

