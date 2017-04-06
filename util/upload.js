exports.upload = function(app){
    var multipart = require('connect-multiparty');
    var fs = require('fs-extra');
    app.use(multipart({uploadDir: __dirname}));
    app.post('/upload',function (req, res) {
        var productImagePath = null, files = req.files,file=null;
        var returnSourceFileSrc = null;
        if(!files || !files.file.path){
            return res.send({"status": "fail", "message": "No file upload"})
        }else{
            file = files.file;
        }
        fs.copy(file.path,productImagePath,function(err){
            if(err){
                return res.send({"status": "fail", "message": "No file upload"})
            }
            else{
                fs.remove(file.path);
            }
            return res.send({"status": "success", "message": "file uploaded","sourceFileSrc":returnSourceFileSrc})
        })
    });
    return app;
};
var uploadTest = function($upload,files){
    //angular test  Module:angularFileUpload
    $upload.upload({
        url: 'http://127.0.0.1:8000/upload',
        file: files[0]
    }).progress(function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    }).success(function (data, status, headers, config) {
        if(data.status == "success"){
            $("#"+picId).val(data.sourceFileSrc);
            $("#"+picPathId).attr({"src":"http://"+$scope.ip+":3001"+data.sourceFileSrc});
        }
    });
}