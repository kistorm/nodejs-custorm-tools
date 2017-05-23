var https = require('https');
var fs = require('fs');

var options = {
    pfx:fs.readFileSync('keys/server.pfx'),
    passphrase:'kistorm'
};

https.createServer(options,function(req,res){
    res.writeHead(200);
    res.end('hello world\n');
}).listen(3000,'127.0.0.1');