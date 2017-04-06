/**
 *  批量整理多文件
 *  将多个文件按量移动到指定目录
 */
/**
 * Created by kistorm on 16/3/4.
 */
var url = "/Users/kistorm/Desktop/abcdefg";
var url2 = "/Users/kistorm/Desktop/abcefg";
var fse = require('fs-extra');
var fs = require('fs');
var files = fs.readdirSync(url);
var async = require('async');

var tasks = [], tempArray = new Array();
var p = 0;
for (var i = 0; i < files.length; i++) {
    tempArray.push({
        source: url + "/" + files[i],
        target: url2 + "/" + p + "/" + files[i]
    })
    if (i % 100 == 0) {
        fse.mkdirsSync(url2 + "/" + i);
        if (tempArray.length > 1) {
            tasks.push(tempArray);
        }
        p = i;
        tempArray = new Array();
    }
}

async.each(tasks, function (task, cb) {
    async.each(task, function (tk, cbb) {
        console.log(tk.source, tk.target);
        fse.copy(tk.source, tk.target, cbb)
    }, cb)
}, function (err) {
    console.log(err);
})
