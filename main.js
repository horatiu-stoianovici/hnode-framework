module.exports.handle = function(server, end) {
    var response = server.response;
    response.writeHead(200, {
        'Content-type': 'text/html'
    });

    var fs = require('fs');
    var handlebars = require('handlebars');

    registerHandlebarsHelpers(handlebars);

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
    				
    				var pageOutput = pageTemplate(model);
                    processSkinForPage(pageOutput, model, handlebars, server, fullpathWithoutExtension, end, fs, function(finalOutput){
                        response.write(finalOutput)
                        end(); 
                    });
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
    	response.writeHead(404, {
    		'Content-type': 'text/plain'
    	});
    	response.write('404 - Not Found!');
   		end();
    }
}

///register handlebar helpers if not already registered
function registerHandlebarsHelpers(handlebars){
    if(!('skin' in handlebars.helpers)){
        //helper to set a skin for a template
        handlebars.registerHelper('skin', function(skin, options) {
            this.__skin = skin;
        });

        //helper for supporting sections
        handlebars.registerHelper('section', function(sectionName, options) {
            if(!this.__sections){
                this.__sections = {};
            }
            //the content of the section is the rendered contents of the block
            this.__sections[sectionName] = options.fn(this);
            return '';
        });
    }
}

//checks if there is a skin declared for the page and uses it if it exists
function processSkinForPage(pageOutput, skinModel, handlebars, server, pagePath, end, fs, callback){
    if(!skinModel.__skin){
        callback(pageOutput);
    }
    else {
        var response = server.response;
        var relativeSkinPath = skinModel.__skin;
        var skinPath = pagePath.split('/');
        skinPath.splice(skinPath.length - 1, 1);
        skinPath = skinPath.join('/') + '/' + relativeSkinPath;
        
        //check if .nhtml file exists
        if(fs.existsSync(skinPath + '.nhtml')){
            //chech if .nhtml.js file exists
            if(fs.existsSync(skinPath + '.nhtml.js')){
                //get the codebehind of the skin
                var skin = require(skinPath + '.nhtml.js');
                //execute the gandleRequest method of the page's codebehind
                skin.handleRequest(server, function(model){
                    fs.readFile(skinPath + '.nhtml', 'utf8', function(err, skinTemplateText){
                        if(err){
                            response.writeHead(500, {
                                'Content-type': 'text/html'
                            });
                            response.write('Error: ' + err.toString());
                            response.end();
                            return;
                        }

                        var skinTemplate = handlebars.compile(skinTemplateText);

                        response.writeHead(200,{
                            'Content-type': 'text/html'
                        });
                        
                        model.__sections = skinModel.__sections;
                        model.__content = pageOutput;
                        var skinOutput = skinTemplate(model);
                        callback(skinOutput);
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
            response.writeHead(404, {
                'Content-type': 'text/plain'
            });
            response.write('404 - Not Found!');
            end();
        }
    }
}