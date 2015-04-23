var parseTimestamp = require('../util/parseTimestamp');
var getCurrentUser = require('./getCurrentUser');
var getConfig = require('./getConfig');
var $ = require("mongous").Mongous;
module.exports = function(req, res) {
    var user = getCurrentUser(req);

    console.log('get request', req.params.id);
    if (req.params.id != 'all') {
        $("database.collection").find({
            "id": req.params.id
        }, function(r) {
            //console.log('get ',req.params.id,' from db', r.documents, r.numberReturned);
            for (var i = 0, l = r.documents.length; i < l; i++) {
                delete r.documents[i]._id;
            }
            console.log('get', r.documents);
            res.send(r.documents);
        });
    } else {
        getConfig(user, function(response) {
            //console.log('getfromDB', response);
            var enabledMod = response['moduleList'];
            var select = ['mod_id', 'id'];
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
                    // if(!!r.documents[i]['createTimestamp']&&r.documents[i]['createTimestamp'].length!=0){
                    //     var ts = r.documents[i]['createTimestamp'] 
                    //     r.documents[i]['createTimestamp'] = parseTimestamp(ts).year+'/'+parseTimestamp(ts).month+'/'+parseTimestamp(ts).day;
                    // }else{
                    //     r.documents[i]['createTimestamp'] = '';
                    // }
                    // if(!!r.documents[i]['updateTimestamp']&&r.documents[i]['updateTimestamp'].length!=0){
                    //     var ts = r.documents[i]['updateTimestamp'] 
                    //     r.documents[i]['updateTimestamp'] = parseTimestamp(ts).year+'/'+parseTimestamp(ts).month+'/'+parseTimestamp(ts).day;
                    // }else{
                    //     r.documents[i]['updateTimestamp'] = '';
                    // }
                }
                // console.log('get all', r.documents);
                res.send(r.documents);
            });
        })

    }
}