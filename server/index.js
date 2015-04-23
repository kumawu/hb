var fs = require('fs');
var request = require('request');
var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');
var exec = require('child_process').exec
var session = require('cookie-session');
// var $ = require("mongous").Mongous;
var serverConfig = require('./config');
var router = require('./router');

var merge = require('./util/merge');
var rmInArray = require('./util/rmInArray');
// var getProjects = require('./util/getProjects');
var returnImg = require('./util/returnImg');
var parseCookie = require('./util/parseCookie');
// var createEmailHtml = require('./util/createEmailHtml');
var parseTimestamp = require('./util/parseTimestamp');

var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);

var moduleList = [];
var projectList = [];
var userList = [];
var userConfig = [];

//默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析  
//application/x-www-form-urlencoded和application/json  
//请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：     
module.exports = function() {
    $().open('10.210.74.72', 27017);
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    // parse application/json
    app.use(bodyParser.json())
    app.use(session({
        keys: ['key1', 'key2'],
        secureProxy: true // if you do SSL outside of node
    }))
    $("database.collection").find({
        "title": {
            $exists: true
        }
    }, function(r) { //res.send不能当做回调
        moduleList = r.documents;
    });

    $("database.collection").find({
        "existingMembers": {
            $exists: true
        }
    }, function(r) { //res.send不能当做回调
        userList = r.documents;
    });
    $("database.collection").find({
        "user": {
            $exists: true
        }
    }, function(r) {
        userConfig = r.documents;
    });

    app.get('/', function(req, res) {
        res.sendfile(serverConfig.rootPath + 'prom/html/index.html');
    });
    app.get('/prom', function(req, res) {
        res.sendfile(serverConfig.rootPath + 'prom/html/index.html');
    });

    app.get('/setconfig/:config/:type', function(req, res) {
        router.setConfig(req, res, io);
    });
    app.get('/get/:id', function(req, res) {
        router.get(req, res, io);
    });
    app.get('/testAPI', function(req, res) {
        var tmpl = fs.readFileSync('views/testAPI.jade');
        var template = jade.compile(tmpl, 'utf-8');
        var cookies = parseCookie(req.headers.cookie);
        var user = cookies.username;
        // console.log('testAPPPPPPPPPP', userConfig);
        router.getConfig(user, function(response) {
            //console.log('getfromDB', response);
            getProjects(function(response) {
                res.send(template({
                    user: cookies.username,
                    modules: response,
                    enabledMod: response['moduleList']
                }));
            });

        })
    });

    app.get('/getConfig', function(req, res) {
        var cookies = parseCookie(req.headers.cookie);
        var user = cookies.username;
        router.getConfig(user, function(response) {
            getProjects(function(resposne2) {
                res.send({
                    allModules: resposne2,
                    config: response
                });
            });
        })
    });
    app.get('/send', function(req, res) {
        var cookies = parseCookie(req.headers.cookie);
        var user = cookies.username;
        router.getConfig(user, function(response) {
            // console.log('getfromDB', response);
            var enabledMod = response['moduleList'];
            var select = ['mod_id'];
            var db = [];
            for (var i = 0, l = enabledMod.length; i < l; i++) {
                for (var j = 0, lj = select.length; j < lj; j++) {
                    var k = select[j];
                    var v = enabledMod[i];
                    var _tmp = {};
                    _tmp[k] = v;
                    db.push(_tmp);
                }
            }
            //console.log('dbbbbbbb', db);
            $("database.collection").find({
                $or: db
            }, function(r) {
                for (var i = 0, l = r.documents.length; i < l; i++) {
                    delete r.documents[i]._id;
                    if(!!r.documents[i]['createTimestamp']&&r.documents[i]['createTimestamp'].length!=0&&r.documents[i]['createTimestamp'].toString().indexOf('/')==-1){
                        var ts = r.documents[i]['createTimestamp'] 
                        r.documents[i]['createTimestamp'] = parseTimestamp(ts).year+'/'+parseTimestamp(ts).month+'/'+parseTimestamp(ts).day;
                    }
                    if(!!r.documents[i]['updateTimestamp']&&r.documents[i]['updateTimestamp'].length!=0){
                        var ts = r.documents[i]['updateTimestamp'] 
                        r.documents[i]['updateTimestamp'] = parseTimestamp(ts).year+'/'+parseTimestamp(ts).month+'/'+parseTimestamp(ts).day;
                    }else{
                        r.documents[i]['updateTimestamp'] = '';
                    }
                }
                var opt = {
                    user: user
                };
                // mailSend(createEmailHtml(r, opt), {
                //     sendName: user
                // });
                createEmailHtml(r, opt, function(html) {
                    mailSend(html, {
                        sendName: user
                    })
                });
            });
        })
    });
    app.get('/bgImg', function(req, res) {
        returnImg(req, res);
    });
    app.get('/preview', function(req, res) {
        var cookies = parseCookie(req.headers.cookie);
        var user = cookies.username;
        router.getConfig(user, function(response) {
            var enabledMod = response['moduleList'];
            var select = ['mod_id'];
            var db = [];
            for (var i = 0, l = enabledMod.length; i < l; i++) {
                for (var j = 0, lj = select.length; j < lj; j++) {
                    var k = select[j];
                    var v = enabledMod[i];
                    var _tmp = {};
                    _tmp[k] = v;
                    db.push(_tmp);
                }
            }
            $("database.collection").find({
                $or: db
            }, function(r) {
                //console.log('get all from db all', r.documents);
                for (var i = 0, l = r.documents.length; i < l; i++) {
                    delete r.documents[i]._id;
                    if(!!r.documents[i]['createTimestamp']&&r.documents[i]['createTimestamp'].length!=0&&r.documents[i]['createTimestamp'].toString().indexOf('/')==-1){
                        var ts = r.documents[i]['createTimestamp'] 
                        r.documents[i]['createTimestamp'] = parseTimestamp(ts).year+'/'+parseTimestamp(ts).month+'/'+parseTimestamp(ts).day;
                    }
                    if(!!r.documents[i]['updateTimestamp']&&r.documents[i]['updateTimestamp'].length!=0){
                        var ts = r.documents[i]['updateTimestamp'] 
                        r.documents[i]['updateTimestamp'] = parseTimestamp(ts).year+'/'+parseTimestamp(ts).month+'/'+parseTimestamp(ts).day;
                    }else{
                        r.documents[i]['updateTimestamp'] = '';
                    }
                }
                //console.log('get all', r.documents);
                var opt = {
                    user: user
                }
                createEmailHtml(r, opt, function(html) {
                    res.send(html)
                });
                // res.send(createEmailHtml(r, opt));
            });
        })
    });

    

    app.get('/remove/:id', function(req, res) {
        router.remove(req, res, io);
    });

    app.get('/removeuser/:id', function(req, res) {

        $("database.collection").remove({
            user: req.params.id
        });

    });
    app.get('/getuser', function(req, res) {
        $("database.collection").find({
            "user": {
                $exists: true
            }
        }, function(r) {
            // console.log(r.documents);
            res.send(r.documents);
        });
    });
    app.get('/getproject', function(req, res) {
        getProjects(function(response) {
            res.send(response);
        })
    });

    app.post('/post/:id', function(req, res) {
        router.post(req, res, io);
    });

    app.get('/clearUser', function(req, res) {
        $("database.collection").find({
            "user": {
                $exists: true
            }
        }, function(r) {
            var users = r.documents;
            for (var i = 0, l = users.length; i < l; i++) {
                var user = users[i];
                if (typeof user['user'] == 'object') {
                    var _tmp = user;
                    user['user'] = user['user']['user'];
                    $("database.collection").update({
                        _id: user['_id']
                    }, user);
                }
                $("database.collection").find({
                    'user': user['user']
                }, function(r) {
                    if (r.numberReturned > 1) {
                        for (var i = 1, l = r.numberReturned; i < l; i++) {
                            $("database.collection").remove({
                                '_id': r.documents[i]['_id']
                            })
                        }
                    }
                });
            }
        });
    });
    app.post('/login', function(req, res) {
       router.login(req.param('username'),req.param('pwd'),res);
    })
    app.get('/search/:value', function(req, res) {

        console.log('searching.......................', req.params.value);
        $("database.collection").find({
            $or: [{
                "title": {
                    $exists: true
                }
            }, {
                "name": {
                    $exists: true
                }
            }]
        }, function(r) {
            //console.log('from db', r, r.documents, r.numberReturned);
            var result = [];
            for (var i = 0, l = r.documents.length; i < l; i++) {
                //console.log('diff,',req.params.value,r.documents[i].title||r.documents[i].name);
                if ((!!r.documents[i].title && r.documents[i].title.indexOf(req.params.value) > -1) || (!!r.documents[i].name && r.documents[i].name.indexOf(req.params.value) > -1)) {
                    result.push(r.documents[i]);
                }
            }
            console.log('result', result);
            res.send(result);
        });
    })
    app.use(express.static(serverConfig.rootPath + 'prom/'));
    server.listen(8000);
    console.log('running 8000');

};



// function getAllModules(cb) {
//     $("database.collection").find({
//         "title": {
//             $exists: true
//         }
//     }, function(r) {
//         cb(r.documents);
//     });
// }