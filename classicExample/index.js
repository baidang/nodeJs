var server = require('./server');
var router = require('./router');
var requestHandles = require('./requestHandles');

var handle = {}; //定义handle为一个键/键值对应的对象

handle['/'] = requestHandles.start;
handle['/start'] = requestHandles.start;
handle['/upload'] = requestHandles.upload;
handle['/show'] = requestHandles.show;

server.start(router.route, handle);