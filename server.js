
// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var main = require('./main');

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
	//connect to the database
	var MongoClient = require('mongodb').MongoClient;

	// Connection URL
	var connectionUrl = 'mongodb://localhost:27017/topline';

	// Use connect method to connect to the Server
	MongoClient.connect(connectionUrl, function(err, db) {
		if(!err){
			//connection to the database is successful
			//create the POST data
			processPostData(request, function(post){
				//POST data created

				//get data from the url
				var url_parts = url.parse('http://' + request.headers.host + request.url, true);
				
				if(serverConfig.monitorConnections){
					console.log('"' + request.url + '" requested by ' + request.connection.remoteAddress.toString());
				}
				main.handle({
						get: url_parts.query,
						post: post,
						headers: request.headers,
						host: request.headers.host,
						hostname: url_parts.hostname,
						url: request.url,
						path: url_parts.path,
						pathname: url_parts.pathname,
						db: db,
						response: response,
						request: request,
						serverConfig: serverConfig
					}, function(){
						db.close();
						response.end();
					});
			});

		}
		else {
			response.writeHead(500, {
				'Content-type': 'text/plain'
			});
			response.write('500 - internal server error\n\nDetails:\n- mongodb conection error\n');
		}
	});
	return;
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(80);

// Put a friendly message on the terminal
console.log("Server running on port 80");
