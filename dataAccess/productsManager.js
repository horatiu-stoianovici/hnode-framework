//inserts a single product in the DB
//callback gets a parameter err that specifies if there was an error
module.exports.insertProduct = function(product, db, callback){
	var collection = db.collection('products');
	collection.insert([product], function(err, result){
		callback(err);
	})
};

//inserts a list (or dictionary) of products in the DB
//callback gets a parameter err that specifies if there was an error
module.exports.insertProducts = function(products, db, callback){
	var collection = db.collection('products');
	collection.insert(products, function(err, result){
		callback(err);
	});
};

//gets all the products from the db
module.exports.getProducts = function(db, callback, optionsForFind){
	var collection = db.collection('products');
	collection.find({}, null, optionsForFind).toArray(function(err, docs) {
		if(docs){
			callback(err, docs);
		}
		else {
			callback(err, []);
		}
	});
}

//get a product by product id
module.exports.getProduct = function(db, productID, callback){
	var collection = db.collection('products');
	collection.find({ProductID: productID}).toArray(function(err, docs){
		if(docs && docs[0]){
			callback(err, docs[0]);
		}
		else {
			callback(err, null);
		}
	});
}