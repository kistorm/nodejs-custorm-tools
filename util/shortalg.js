/**
 * Created by user on 2017/4/6.
 */
var shortUrlGenerate = function (url) {
    var chars = ["a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"];
    var encryptedTextBytes = require('crypto').createHash('md5').update(url).digest('hex');
    var result = "";
    for (var i = 0; i < 6; i++) {
        var hex1 = (0xff & encryptedTextBytes[i * 2]) + "";
        var hex2 = (0xff & encryptedTextBytes[i * 2 + 1]) + "";
        hex1 = hex1.length == 1 ? "0" + hex1 : hex1;
        hex2 = hex2.length == 1 ? "0" + hex2 : hex2;
        var index = parseInt(parseFloat(hex1 + hex2, 16) % chars.length);
        result += chars[index];
    }
    return result;
}
var isBlank = function (str) {
    if (typeof str !== "string") {
        str += "";
        return str.trim().length > 0 ? false : true;
    }
    if (!str
        || str == null || str == undefined
        || str === '' || str.trim() === '') {
        return true;
    }
    return false;
};

var condense = function (text) {
    if (isBlank(text)) return "";
    var text = text.toString();
    // 要使用生成 URL 的字符
    var chars = ["a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"];
    // 对传入网址进行 MD5 加密
    var sMD5EncryptResult = md5(text);
    var hex = sMD5EncryptResult;

    var resUrl = new Array(4);
    for (var i = 0; i < 4; i++) {

        // 把加密字符按照 8 位一组 16 进制与 0x3FFFFFFF 进行位与运算
        var sTempSubString = hex.substring(i * 8, i * 8 + 8);

        // 这里需要使用 long 型来转换，因为 Inteper .parseInt() 只能处理 31 位 , 首位为符号位 , 如果不用 long ，则会越界
        var lHexLong = (0x3FFFFFFF & parseFloat(sTempSubString, 16));
        var outChars = "";
        for (var j = 0; j < 6; j++) {
            // 把得到的值与 0x0000003D 进行位与运算，取得字符数组 chars 索引
            var index = (0x0000003D & lHexLong);
            // 把取得的字符相加
            outChars += chars[parseInt(index)];
            // 每次循环按位右移 5 位
            lHexLong = lHexLong >>> 5;
        }
        // 把字符串存入对应索引的输出数组
        resUrl[i] = outChars;
    }
    //var value = resUrl[Math.round(Math.random() * 3)];
    return resUrl;
}