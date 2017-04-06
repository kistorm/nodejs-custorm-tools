var json2xls = require('json2xls');
var json = {
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
}
json = require('./data.json');
var xls = json2xls(json);
var fs = require('fs');
fs.writeFileSync('data.xlsx', xls, 'binary');