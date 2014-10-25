module.exports.handle = function(server, end) {
    var response = server.response;
    response.writeHead(200, {
        'Content-type': 'text/html'
    });

    var fs = require('fs');
    var handlebars = require('handlebars');

    //the default route searches in the "pages" folder for the path requested.
    //it searches for .nhtml and for .nhtml.js files that have the same name as the path
    var path = server.pathname == '/' ? '/index' : server.pathname;
    var fullpathWithoutExtension = __dirname + '/pages' + path;

    //check if .nhtml file exists
    if(fs.existsSync(fullpathWithoutExtension + '.nhtml')){
    	//chech if .nhtml.js file exists
    	if(fs.existsSync(fullpathWithoutExtension + '.nhtml.js')){
    		//get the codebehind of the page
    		var page = require(fullpathWithoutExtension + '.nhtml.js');
    		//execute the gandleRequest method of the page's codebehind
    		page.handleRequest(server, function(model){
    			fs.readFile(fullpathWithoutExtension + '.nhtml', 'utf8', function(err, pageTemplateText){
    				if(err){
    					response.writeHead(500, {
    						'Content-type': 'text/html'
    					});
    					response.write('Error: ' + err.toString());
    					response.end();
    					return;
    				}
    				var pageTemplate = handlebars.compile(pageTemplateText);
    				response.writeHead(200,{
    					'Content-type': 'text/html'
    				});
    				var output = pageTemplate(model);
    				response.write(output);
    				end();
    			})
    		}, end);
    	}
    	else {
    		response.writeHead(500, {
    			'Content-type': 'text/plain'
    		});
    		response.write('500 - Internal server error!\nThere is no codebehind file(.nhtml.js) found for pages' + server.pathname + ', although there is a pages' + server.pathname + '.nhtml file');
  			end();
    	}
    }
    else{
    	console.log('Requested ' + server.pathname + ' but the file ' + fullpathWithoutExtension + '.nhtml does not exist!');
    	response.writeHead(404, {
    		'Content-type': 'text/plain'
    	});
    	response.write('404 - Not Found!');
   		end();
    }
}
