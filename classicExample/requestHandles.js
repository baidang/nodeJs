//var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, postData){
	//var content = "Empty";
	console.log("Function 'start' is called!");

	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

	response.writeHead(200, {"Content-Tpye":"text/plain"});
	response.write(body);
	response.end();
}

function upload(response, request){

	console.log("Function 'upload' is called!");
	var form = new formidable.IncomingForm();
	form.uploadDir = "tmp";

	//console.log("about to parse");

	form.parse(request, function(error, fields, files){
		//console.log("parse done");
		console.log("F.U.P: " + files.upload.path);
		setTimeout(function(){
			try{
				fs.renameSync(files.upload.path, "tmp/test.png");
			} catch(e){
				console.log(e);
			}
		response.writeHead(200, {"Content-Type":"text/html"})
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
		}, 1000);
	});
}



function show(response, request){
	console.log("Fucntion 'show' is called!");

	fs.readFile("tmp/test.png","binary",function(error, file){
		if(error)
		{
			response.writeHead(500, {"Content-Type":"text/plain"});
			response.write(error + "\n");
			response.end();
		}
		else
		{
			response.writeHead(200, {"Content-Type":"text/plain"});
			response.write(file, "binary");
			response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;