
var client = require('redis').createClient('6379', 'localhost');
client.publish("fly","fffff");