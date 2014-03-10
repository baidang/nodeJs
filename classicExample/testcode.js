var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<b>helldddoffdasf</b>');
    res.end();
}).listen(3000);     //事件监听3000端口
console.log('open 2s ');
