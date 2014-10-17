

module.exports.handle = function(server, end){
	var response = server.response;
	response.writeHead(200, {
		'Content-type': 'text/plain'
	});

	if(server.get.command == 'insertProducts'){
		insertProducts(server, end);
	}

	//command to get a single product
	else if(server.get.command == 'getProduct'){
		var productID = server.get.productID;
		var productsManager = require('./dataAccess/productsManager');
		productsManager.getProduct(server.db, productID, function(err, product){
			if(err){
				response.write('Error:' + err.toString());
			}
			else {
				response.write(JSON.stringify(product));
			}
			end();
		});
	}

	//command to get the categories from the web service and put them in the DB
	else if (server.get.command == 'retrieveCategories')
	{
		var categoriesSyncher = require('./synching/categoriesSyncher');
		categoriesSyncher.fetchCategories(server.db, function(err, categories){
			if(err){
				response.write('Error: ' + err.toString());
			}
			else {
				response.write(JSON.stringify(categories, null, 4));
			}
			end();
		});
	}

	//command to get all the categories
	else if (server.get.command == 'getCategories'){
		var categoriesManager = require('./dataAccess/categoriesManager');
		categoriesManager.getCategories(server.db, function(err, categories){
			if(err){
				response.write('Error: ' + err.toString());
			}
			else {
				response.write(JSON.stringify(categories, null, 4));
			}
			end();
		});
	}

	//command to get a category
	else if (server.get.command == 'getCategory'){
		var categoryID = server.get.categoryID;
		if(!categoryID || categoryID == 0){
			response.write('No categoryID provided');
			end();
		}
		else {
			var categoriesManager = require('./dataAccess/categoriesManager');
			categoriesManager.getCategory(server.db, categoryID, function(err, category){
				if(err){
					response.write('Error ' + err.toString());
				}
				else {
					response.write(JSON.stringify(category));
				}
				end();
			});
		}
	}

	else {
		var address = server.request.connection.remoteAddress;
		response.write(address.toString());
		end();
	}
}

function insertProducts(server, end){
	var db = server.db;
	var response = server.response;

	//get the existing products
	var fs = require('fs');

	if(fs.existsSync('products.json')){
		//the products where already fetched from the service and saved to file
		//get them from the file
		fs.readFile('products.json', 'utf8', function(err, data){
			if(err){
				response.writeHead(500, {
					'Content-type': 'text/plain'
				});
				response.write('500 - internal server error\n\n Error reading file with products!');
				end();
			}
			else {
				//use the data
				processProductData(data, server, end);
			}
		});
	}
	else {
		//get the products from the web service
		var http = require('http');

		var options = {
		    host: 'pcws.topline.ie',
		    path: '/json/syncreply/ProductList?ParentID=-1'
		}
		var request = http.request(options, function (res) {
		    var data = '';
		    res.on('data', function (chunk) {
		        data += chunk;
		    });
		    res.on('end', function () {
		    	//save data for faster use in the future
		    	fs.writeFile('products.json', data, function(err){
		    		if(err){
		    			//error saving the file
		    			response.writeHead(500, {
							'Content-type': 'text/plain'
						});
						response.write('500 - internal server error\n\n Error saving file with products!');
						end();			
		    		}
		    		else {
				    	//use the data
				        processProductData(data, server, end);
		    		}
		    	})
		    });
		});
		request.on('error', function (e) {
		    response.write('error');
		    end();
		});
		request.end();
	}
}


function processProductData(data, server, end){
	var response = server.response;
	//process the data from the webservice
    var productsList = JSON.parse(data).productList;

    retrieveProcessedProductsList(productsList, function(processedProducts){
    	var limit = server.get.limit;
    	if(!limit){
    		limit = 1;
    	}
    	var count = 0;
    	var expectedCount = 0;
    	var actualCount = 0;
    	var totalUnprocessed = 0;
    	var broke = false;

    	//get full products from the server (with limit)
    	for(var productId in processedProducts){
    		var processedProduct = processedProducts[productId];
    		if(!processedProduct){
    			totalUnprocessed++;
    			if(broke){
    				continue;
    			}
    			//if product is not processed get it
    			expectedCount++;
    			retrieveProduct(productId, function(product){
    				processedProducts[product.ProductID] = product;
    				actualCount++;
    			});
    			count++;
    			if(count == limit){
    				broke = true;
    			}
    		}
    	}

    	if(count == 0){
    		response.write('No more unprocessed products!');
    		var productsManager = require('./dataAccess/productsManager');
    		var productsToInsert = [];
    		for(var i in processedProducts){
    			productsToInsert.push(processedProducts[i]);
    		}
    		productsManager.insertProducts(productsToInsert, server.db, function(err){
    			if(err){
    				response.write('Error inserting products in DB: ' + err.toString());
    			}
    			else {
    				response.write('Inserted products in DB successfully');
    			}
    			end();	
    		})
    	}
    	else {
	    	//scan for where the process of getting all products ended
	    	var func = function(){
	    		if(actualCount == expectedCount){
	    			saveProcessedProducts(processedProducts, function(){
	    				server.response.write('Success! Total unprocessed was ' + totalUnprocessed);
	    				end();
	    			});
	    		}
	    		else {
	    			console.log(actualCount);
	    			setTimeout(func, 1000);
	    		}
	    	}

	    	func(func);
	    }
    });
}

//get a single product from the web service
function retrieveProduct(productId, callback){
	//get the products from the web service
	var http = require('http');

	var options = {
	    host: 'pcws.topline.ie',
	    path: '/json/syncreply/Product?ProductID=' + productId
	}
	var request = http.request(options, function (res) {
	    var data = '';
	    res.on('data', function (chunk) {
	        data += chunk;
	    });
	    res.on('end', function () {
	    	callback(JSON.parse(data).product[0]);
	    });
	});
	request.on('error', function (e) {
	    response.write('error');
	    end();
	});
	request.end();
}

//get the products that were processed until now
function retrieveProcessedProductsList(allProducts, callback){
	var fs = require('fs');
	//if there are processed products read the file
	if(fs.existsSync('processedProducts.json')){
		fs.readFile('processedProducts.json', 'utf8', function(err, data){
			callback(JSON.parse(data));
		});
	}
	else {
		//if there are not processed products create the file with no processed products
		var processedProducts = {};
		for(var i in allProducts){
			var product = allProducts[i];
			processedProducts[product.ProductID] = null;
		}
		fs.writeFile('processedProducts.json', JSON.stringify(processedProducts), function(err){
			callback(processedProducts);
		});
	}
}

function saveProcessedProducts(processedProducts, callback){
	var fs = require('fs');
	fs.writeFile('processedProducts.json', JSON.stringify(processedProducts, null, 2), function(err){
		callback();
	});
}