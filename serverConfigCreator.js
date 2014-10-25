module.exports.generateServerConfig = function(){
	var config = {};

	//reading the mime types
	configureMimeTypes(config);
	
	//config.json file
	configureFromConfigFile(config);

	//command line arguments
	configureCommandLineArguments(config);

	//process config values
	processConfigValues(config);

	//get pages
	getPages(config);

	return config;
}

//read the mimetypes from the config file
function configureMimeTypes(config){
	var fs = require('fs');
	var data = fs.readFileSync('mimeTypes.config');
	var lines = data.toString().split('\n');
	var mimeTypes = {};

	for(var i in lines){
		var line = lines[i];
		var splitted = line.split('\t');
		mimeTypes[splitted[0]] = splitted[1]
	}
	
	config.mimeTypes = mimeTypes;
}

//looks at the arguments given from command line and makes the appropriate server configs
function configureCommandLineArguments(config){
	process.argv.forEach(function(val, index, array){
		//-m option is to monitor the incoming connections in the console
		if(val == '-m'){
			config.monitorConnections = true;
		}
	});
}

//read the mimetypes from the config file
function configureFromConfigFile(config){
	var fs = require('fs');
	if(!fs.existsSync('config.json')){
		return;
	}
	var data = fs.readFileSync('config.json');
	var object;

	try{
		object = JSON.parse(data);
	}
	catch(err){
		console.log("Invalid config file! Error parsing JSON");
		throw err;
	}

	//reading all the config values and adding them to the config object
	for(var i in object){
		config[i] = object[i];
	}
}

//additional processing for the configuration
function processConfigValues(config){
	//processing resources: include full path
	for(var i in config.staticResources){
		config.staticResources[i] = __dirname + '/' + config.staticResources[i];
	}
}

function getPages(config){
	
}