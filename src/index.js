const express = require("express");

var log = require('./modules/mylog');
var { countries } = require("countries-list");

const app = express();
app.get('/', function(request, response){
	response.status(200).send("HELLO");
});

//var server = http.createServer(function(request, response){ 
//var parsed = url.parse(request.url);
//console.log("parsed:", parsed);
//var pathname = parsed.pathname;
//var query = querystring.parse(parsed.query);
//	console.log("query: ", query);
//	response.writeHead(200,{'Content-Type': 'text/html'});			response.write('<html><body><p>Home<p></body></html>');
//	response.end();
//}else if(pathname === "/exit"){
//	response.writeHead(200,{'Content-Type': 'text/html'});	
//	response.write('<html><body><p>exit</p></body></html>');
//	response.end();
//}else if(pathname === "/country"){
//	var result = log.info(request.url);
//	response.writeHead(200,{'Content-Type': 'text/html'});	
//	response.write(JSON.stringify(countries[query.code]));
///	response.end();
///}else if(pathname === "/info"){
///	var result = log.info(request.url);
///	response.writeHead(200,{'Content-Type': 'text/html'});	
///	response.write(result);
///	response.end();
///}else if(pathname === "/error"){
///	var result = log.error(request.url);
///	response.writeHead(200,{'Content-Type': 'text/html'});	
///	response.write(result);
///	response.end();
///}else{
///	response.writeHead(404,{'Content-Type': 'text/html'});	
///	response.write('<html><body><p>NOT FOUND</p></body></html>')
///	response.end();
///}
///
///});
app.listen(4000,function(){	
	console.log("running in port 4000");
});


