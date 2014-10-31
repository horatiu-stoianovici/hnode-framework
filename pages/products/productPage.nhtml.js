module.exports.handleRequest = function(server, render, end){

    //connect to the database
    var MongoClient = require('mongodb').MongoClient;

    // Connection URL
    var connectionUrl = 'mongodb://localhost:27017/topline';

    // Use connect method to connect to the Server
    MongoClient.connect(connectionUrl, function(err, db) {
        if(!err){
            //connected to the db successfully
            var categoriesManager = require('../../dataAccess/productsManager');

            //getting all the level 0 categories
            categoriesManager.getProduct(db, server.get.productId, function(err, product){
                if(err){
                    //error!
                    response.writeHead(500, {
                        'Content-type': 'text/html'
                    });
                    response.write('Error: ' + err.toString());
                    end();
                }
                else {
                    //response.write(JSON.stringify(product, null, 4));
                    //end();
                    render({
                        product: product
                    });
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