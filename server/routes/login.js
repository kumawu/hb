var exec = require('child_process').exec;
function login(mail, pwd, res) {
    console.log(mail, 'login...');
    var svn = 'svn log --no-auth-cache --username ' + mail + ' --password "' + pwd + '" https://svn1.intra.sina.com.cn/weibo/ria/t4/enterprise/dev/trunk/static/js/xIframeH.js';
    var child = exec(svn, {
        timeout: 2000
    }, function(error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
            //console.log('exec error: ' + error);
        }
        if (stdout.indexOf('wukan') > -1) {
            res.send('Passed');
        } else {
            console.log('timeout!');
            res.send('Not Pass.');

        }
    });

}
module.exports = login;