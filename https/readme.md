用Node.js创建自签名的HTTPS服务器

创建自己的CA机构
创建服务器端证书
创建客户端证书
将证书打包
创建自己的CA机构

为CA生成私钥
 openssl genrsa -out ca-key.pem -des 1024

通过CA私钥生成CSR
 openssl req -new -key ca-key.pem -out ca-csr.pem

通过CSR文件和私钥生成CA证书
 openssl x509 -req -in ca-csr.pem -signkey ca-key.pem -out ca-cert.pem

可能会遇到的问题

 你需要root或者admin的权限
Unable to load config info from /user/local/ssl/openssl.cnf
对于这个问题，你可以从网上下载一份正确的openssl.cnf文件，
然后set OPENSSL_CONF=openssl.cnf文件的本地路径

创建服务器端证书

为服务器生成私钥
 openssl genrsa -out server-key.pem 1024

利用服务器私钥文件服务器生成CSR
 openssl req -new -key server-key.pem -config openssl.cnf -out server-csr.pem

这一步非常关键，你需要指定一份openssl.cnf文件。可以用这个

[req]  
    distinguished_name = req_distinguished_name  
    req_extensions = v3_req  
  
    [req_distinguished_name]  
    countryName = Country Name (2 letter code)  
    countryName_default = CN  
    stateOrProvinceName = State or Province Name (full name)  
    stateOrProvinceName_default = BeiJing  
    localityName = Locality Name (eg, city)  
    localityName_default = YaYunCun  
    organizationalUnitName  = Organizational Unit Name (eg, section)  
    organizationalUnitName_default  = Domain Control Validated  
    commonName = Internet Widgits Ltd  
    commonName_max  = 64  
  
    [ v3_req ]  
    # Extensions to add to a certificate request  
    basicConstraints = CA:FALSE  
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment  
    subjectAltName = @alt_names  
  
    [alt_names]  
	#注意这个IP.1的设置，IP地址需要和你的服务器的监听地址一样
    IP.1 = 127.0.0.1
通过服务器私钥文件和CSR文件生成服务器证书
 openssl x509 -req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in server-csr.pem -out server-cert.pem -extensions v3_req -extfile openssl.cnf

创建客户端证书

生成客户端私钥
 openssl genrsa -out client-key.pem

利用私钥生成CSR
 openssl req -new -key client-key.pem -out client-csr.pem

生成客户端证书
 openssl x509 -req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in client-csr.pem -out client-cert.pem

HTTPS 服务器代码

var https = require('https');
var fs = require('fs');

var options = {
	key: fs.readFileSync('./keys/server-key.pem'),
	ca: [fs.readFileSync('./keys/ca-cert.pem')],
	cert: fs.readFileSync('./keys/server-cert.pem')
};

https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3000,'127.0.0.1');
HTTPS 客户端代码

var https = require('https');
var fs = require('fs');

var options = {
	hostname:'127.0.0.1',
	port:3000,
	path:'/',
	method:'GET',
	key:fs.readFileSync('./keys/client-key.pem'),
	cert:fs.readFileSync('./keys/client-cert.pem'),
	ca: [fs.readFileSync('./keys/ca-cert.pem')],
	agent:false
};

options.agent = new https.Agent(options);
var req = https.request(options,function(res){
console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
	res.setEncoding('utf-8');
	res.on('data',function(d){
		console.log(d);
	})
});

req.end();

req.on('error',function(e){
	console.log(e);
})
将证书打包

打包服务器端证书
 openssl pkcs12 -export -in server-cert.pem -inkey server-key.pem -certfile ca-cert.pem -out server.pfx

打包客户端证书
 openssl pkcs12 -export -in client-cert.pem -inkey client-key.pem -certfile ca-cert.pem -out client.pfx

服务器端代码

var https = require('https');
var fs = require('fs');

var options = {
	pfx:fs.readFileSync('./keys/server.pfx'),
	passphrase:'your password'
};

https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3000,'127.0.0.1');
客户端代码

var https = require('https');
var fs = require('fs');

var options = {
	hostname:'127.0.0.1',
	port:3000,
	path:'/',
	method:'GET',
	pfx:fs.readFileSync('./keys/server.pfx'),
	passphrase:'your password',
	agent:false
};

options.agent = new https.Agent(options);
var req = https.request(options,function(res){
console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
	res.setEncoding('utf-8');
	res.on('data',function(d){
		console.log(d);
	})
});

req.end();

req.on('error',function(e){
	console.log(e);
})