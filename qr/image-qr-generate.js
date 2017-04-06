var qrGenerate = function (qrCode, qrFilePath, qrSetting, next) {
    if (typeof qrCode == 'function') {
        next = qrCode;
    }
    if (typeof qrFilePath == 'function') {
        next = qrFilePath;
    }
    if (typeof qrSetting == 'function') {
        next = qrSetting;
    }
    if (!qrFilePath || !qrCode || typeof qrFilePath !== 'string' || typeof qrCode != 'string') {
        next({err: {type: "args error", message: "qrCode & qrFilePath must be exist"}}, false);
    } else {
        if ("" != qrFilePath.replace(/\s+/g, "")) {
            qrSetting = qrSetting || {
                ec_level: 'M',
                type: 'png',
                size: 65,
                margin: 0
            };
            var qr_png = qr.image(qrCode, qrSetting);
            try {
                fs.createFileSync(qrFilePath, {clobber: false});
                var picStream = fs.createWriteStream(qrFilePath);
                qr_png.pipe(picStream, {end: false});
                qr_png.on('end', function () {
                    next(null, true);
                })
            } catch (error) {
                if (error) {
                    next(error, true);
                }
            }
        } else {
            next({err: {type: "args error", message: "qrFilePath is Invalid"}}, false);
        }
    }
}
var test = function () {
    var code = "http://127.0.0.1:3001/p/downloadPhotos?photoIds=55274d6494c2ef3c2500001b";
    var outPath = "D:\\55274d6494c2ef3c2500001b.png";
    qrGenerate(code, outPath, function (err, result) {
        console.log(err);
    });
}
exports.qrGenerate = qrGenerate;