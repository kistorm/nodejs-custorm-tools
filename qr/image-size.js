exports.checkImageSize = function (path) {
    var sizeOf = require('qr-size');
    var dimensions = sizeOf(path);
    console.log();
    return {
        w: dimensions.width,
        h: dimensions.height
    }
}