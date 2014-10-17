module.exports.generateServerConfig = function(callback){
	var fs = require('fs');
	var data = fs.readFileSync('mimeTypes.config');
	var lines = data.toString().split('\n');
	var config = {};
	var mimeTypes = {};
	config.mimeTypes = mimeTypes;

	for(var i in lines){
		var line = lines[i];
		var splitted = line.split('\n');
		mimeTypes[splitted[0]] = mimeTypes[splitted[1]];
	}

	process.argv.forEach(function(val, index, array){
		//-m option is to monitor the incoming connections in the console
		if(val == '-m'){
			config.monitorConnections = true;
		}
	});

	return config;
}