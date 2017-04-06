/**
 * Created by kistorm on 16/3/4.
 * move files to other folde & split
 */
var fse = require('fs-extra');
var fs = require('fs');
var async = require('async');

function MergeCopy(sourcefolder,targetfolder,splitNum,callback){
    var files = fs.readdirSync(sourcefolder);
    var tasks = [], tempArray = new Array(),x=1;
    if(!files || files.length ==0){
        return callback;
    }
    var pages = files.length%splitNum == 0 ?parseInt(files.length/splitNum):parseInt(files.length/splitNum)+1;
    for(var i =0 ; i <pages;i++){
        fse.mkdirsSync(targetfolder + "/" + (i+1));
    }
    fse.removeSync(targetfolder);
    for (var i = 0; i < files.length; i++) {
        tempArray.push({
            source: sourcefolder + "/" + files[i],
            target: targetfolder + "/" + x + "/" + files[i]
        })
        if(tempArray.length == splitNum){
            tasks.push(tempArray);
            tempArray = new Array();
            x++;
            continue;
        }
        if(i+1 > tasks.length*splitNum){
            if(i == files.length-1) {
                tasks.push(tempArray);
                tempArray = new Array();
            }
        }
    }
    async.each(tasks, function (task, cb) {
        async.each(task, function (tk, cbb) {
            console.log(tk.source, tk.target);
            fse.copy(tk.source, tk.target, cbb)
        }, cb)
    },callback);
};

// test
// var path1 = "D:/git-kistorm/nodejs-custorm-tools/test/MergeCopy/a";
// var path2 = "D:/git-kistorm/nodejs-custorm-tools/test/MergeCopy/b";
// MergeCopy(path1,path2,2,function(e,r){
//     console.log(e,r);
// })







 

