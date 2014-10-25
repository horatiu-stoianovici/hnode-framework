
// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var main = require('./main');
var staticResourcesHandler = require('./staticResourcesHandler');

//gets the POST data from the request
function processPostData(request, callback){
	var body = '';
	request.on('data', function(data) {
		//POST data is being transmitted
		body += data;
	});

	request.on('end', function(){
		//finished getting POST data
		var post = querystring.parse(body);
		callback(post);
	});
}


console.log('Starting server . . .');


var serverConfigCreator = require('./serverConfigCreator');
var serverConfig = serverConfigCreator.generateServerConfig();

// Configure the HTTP server to send the get and post data to the main module
var server = http.createServer(function (request, response) {
	//create the POST data
	processPostData(request, function(post){
		//get data from the url
		var url_parts = url.parse('http://' + request.headers.host + request.url, true);
		
		if(serverConfig.monitorConnections){
			console.log(request.method + ' "' + request.url + '" requested by ' + request.connection.remoteAddress.toString());
		}

		//create server obj
		var serverObj = {
				get: url_parts.query,
				post: post,
				headers: request.headers,
				host: request.headers.host,
				hostname: url_parts.hostname,
				url: request.url,
				path: url_parts.path,
				pathname: url_parts.pathname,
				response: response,
				request: request,
				serverConfig: serverConfig
		};

		//first handle static resources
		staticResourcesHandler.handle(serverObj, function(handled){
			if(handled){
				response.end();
			}
			else {
				//the main handler now handles the request
				main.handle(serverObj, function(){
					response.end();
				});
			}
		});
	});
	return;
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(80);

// Put a friendly message on the terminal
console.log("Server running on port 80");
