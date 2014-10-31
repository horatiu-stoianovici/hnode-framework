module.exports.handleRequest = function(server, render, end){

	//connect to the database
	var MongoClient = require('mongodb').MongoClient;

	// Connection URL
	var connectionUrl = 'mongodb://localhost:27017/topline';

	var response = server.response;
	// Use connect method to connect to the Server
	MongoClient.connect(connectionUrl, function(err, db) {
		if(!err){
			//connected to the db successfully
			var categoriesManager = require('../../dataAccess/categoriesManager');

			//getting all the level 0 categories
			categoriesManager.getCategories(db, { ParentID: "0"}, function(err, categories){
				if(err){
					//error!
					response.writeHead(500, {
						'Content-type': 'text/html'
					});
					response.write('Error: ' + err.toString());
					end();
				}
				else {
					console.log('Found ' + categories.length + ' categories');
					if(categories.length == 0){
						categoriesManager.getCategories(db, null, function(err, categs){
							response.writeHead(500, {
								'Content-type': 'text/plain'
							});
							response.write(JSON.stringify(categs, null, 4));
						 	end();
						})
					}
					else {
						render({
							categories: categories
						});
					}
				}
			});

		}
		else {
			response.writeHead(500, {
				'Content-type': 'text/html'
			});
			response.write('Error: ' + err.toString());
			end();
		}
	});
}