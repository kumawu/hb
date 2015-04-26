var fs = require('fs');
var serverConfig = require('./config');
var data = JSON.parse(fs.readFileSync(serverConfig.rootPath + 'apps/data/em_data.json','utf8'));
var push_list = [];
var now = new Date();
for (var user in data) {
    console.log('user',data[user]['birthmonth'],data[user]['birthday']);
    if (data[user]['birthmonth'] == (now.getMonth() + 1) && data[user]['birthday'] == now.getDate()) {
        push_list.push(data[user]);
    }
}
console.log(push_list);