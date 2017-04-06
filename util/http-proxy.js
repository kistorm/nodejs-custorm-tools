var nodeStatic = require('node-static').Server;
var request = require("request");
var dns = require("dns");
var fileServer = new nodeStatic("./");
var http = require("http");
var port = 8080;
var hosts = {
    'kind':'192.168.8.242',
    'free':'192.168.72.29',
    'cute':'192.168.72.34'
}

var resolv = function(hostname,callback){
    if(/^[\d\.]+$/.test(hostname))callback(hostname);
    else{
        if(hosts[hostname])callback(hosts[hostname]);
        else{
            dns.resolve4(hostname,function(err,addresses){
                if(err){
                    console.error(err);
                    callback(null);
                }else callback(addresses[0]);
            });
        }
    }
}

var httpServer = http.createServer(function(req, res) {
    req.addListener('end', function() {
        fileServer.serve(req, res, function(err, result) {
            if (err && (err.status === 404)) {
                var hoststr = req.headers.host.split(':');
                var hostname = hoststr[0];

                resolv(hostname,function(ip){
                    if(!ip){
                        res.writeHeader(200,'text/html');
                        res.write(req.url);
                        res.end(' request failuer.');
                    }else{
                        if(hoststr.length > 1)ip += (':'+hoststr[1])
                        var p = 'http://'+ip+req.url;
                        req.headers['Host'] = req.headers.host;
                        request({
                            method:req.method,
                            url:p,
                            headers:req.headers
                        }).pipe(res);
                    }
                });
            }
        });
    }).resume();
});

httpServer.listen(port);

console.log('proxy listen in '+port);