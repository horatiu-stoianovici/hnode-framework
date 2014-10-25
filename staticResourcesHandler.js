fullResources = null;
module.exports.handle = function(server, callback){
	var path = server.pathname;
	var config = server.serverConfig;
	var resources = config.staticResources;
	var response = server.response;

	if(!resources){
		callback(false);
	}
	else{
		var fs = require('fs');

		//check if requested file exists
		var fullRequestedPath = __dirname + path;
		if(fs.existsSync(fullRequestedPath)){
			//check if it is a file (not a directory)
			var stats = fs.statSync(fullRequestedPath);
			if(stats.isDirectory()){
				callback(false);
				return;
			}

			//checking if file is inside one for the resource folders
			var isResource = false;
			for(var i in resources){
				if(fullRequestedPath.indexOf(resources[i]) != -1){
					isResource = true;
					break;
				}
			}

			if(!isResource){
				response.writeHead(403, {
					"Content-type": "text/plain"
				});
				response.write('Forbidden!');
				callback(true);
			}
			else {
				//handle 304 responses
				if(server.headers["if-modified-since"]){
					var modifiedSinceDate = new Date(server.headers["if-modified-since"]);
					if(modifiedSinceDate >= stats.mtime){
						response.writeHead(304,{
							"Last-Modified": stats.mtime.toGMTString()
						});
						callback(true);
					}
				}
				//get file from disk
				fs.readFile(fullRequestedPath, function(err, data){
					//get the file's extension
					var fileExtension = fullRequestedPath.split('.');
					fileExtension = '.' + fileExtension[fileExtension.length - 1];
					if(config.mimeTypes[fileExtension]){
						response.writeHead(200, {
							"Content-type": config.mimeTypes[fileExtension],
							"Last-Modified": stats.mtime.toGMTString()
						});
					}
					else {
						response.writeHead(200, {
							"Content-type": "application/octet-stream",
							"Last-Modified": stats.mtime.toGMTString()
						});
					}
					response.write(data);
					callback(true);
				});

				
			}
		}
		else {
			callback(false);
		}
	}
};
