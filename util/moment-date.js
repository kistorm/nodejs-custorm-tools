var dateFormat = [
    "YYYY-MM-DD HH:mm:ss",
    "MM-DD-YYYY HH:mm:ss",
    "MM/DD/YYYY HH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",
    "YYYY/MM/DD HH:mm:ss",
    "YY/MM/DD HH:mm:ss"
];
var output = function (d, f) {
    return require('moment')(d).format(f);
}

var test = function () {
    var dt = "2015-01-13T05:02:56.106Z";
    console.log(output(dt, dateFormat[0]));
}

exports.changeDate = function (date,dateFormat) {
    return output(date, dateFormat);
}