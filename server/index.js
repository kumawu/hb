var fs = require('fs');
var request = require('request');
var express = require('express');
var jade = require('jade');
// var bodyParser = require('body-parser');
// var exec = require('child_process').exec
// var session = require('cookie-session');
// var $ = require("mongous").Mongous;
var serverConfig = require('./config');
var router = require('./router');

// var merge = require('./util/merge');
// var rmInArray = require('./util/rmInArray');
// var getProjects = require('./util/getProjects');
// var returnImg = require('./util/returnImg');
var parseCookie = require('./util/parseCookie');
// var createEmailHtml = require('./util/createEmailHtml');
// var parseTimestamp = require('./util/parseTimestamp');

var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);


//默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析  
//application/x-www-form-urlencoded和application/json  
//请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：     
// $().open('10.210.74.72', 27017);
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

// // parse application/json
// app.use(bodyParser.json())
// app.use(session({
//     keys: ['key1', 'key2'],
//     secureProxy: true // if you do SSL outside of node
// }))



app.get('/', function(req, res) {
    var tmpl = fs.readFileSync(serverConfig.rootPath+'apps/timeline/index.jade');
    var user = {name:"xx",head:'http://tp2.sinaimg.cn/2255839425/180/5607488841/1'}
    var template = jade.compile(tmpl, 'utf-8');
    res.send(template(user));
});

var tmpl = fs.readFileSync(serverConfig.rootPath+'apps/timeline/index.jade');
var template = jade.compile(tmpl, 'utf-8');
var data = JSON.parse(fs.readFileSync(serverConfig.rootPath + 'apps/data/em_data.json','utf8'));
app.get('/:uid', function(req, res) {
    var uid = req.params.uid;
    var user = data[uid];
    console.log(user);
    res.send(template(user));
});

app.use(express.static(serverConfig.rootPath));
server.listen(8000);
console.log('running 8000');