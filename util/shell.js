var child = require('child_process');
var spawn = child.spawn;
//free = spawn('ls', ['-m']);
//// 捕获标准输出并将其打印到控制台
//free.stdout.on('data', function (data) {
//    console.log('standard output:\n' + data);
//});
//// 捕获标准错误输出并将其打印到控制台
//free.stderr.on('data', function (data) {
//    console.log('standard error output:\n' + data);
//});
//// 注册子进程关闭事件
//free.on('exit', function (code, signal) {
//    console.log('child process eixt ,exit:' + code);
//});


child.exec('node ../date',function(err,stdout,stderr){
    console.log(err,stdout,stderr);
})