module.exports.insertCategories = function(categories, db, callback){
	var collection = db.collection('categories');
	collection.insert(categories, function(err, result){
		callback(err);
	});
}

module.exports.getCategories = function(db, searchArgs, callback){
	var collection = db.collection('categories');
	collection.find(searchArgs ? searchArgs : {}).toArray(function(err, docs) {
		if(docs){
			callback(err, docs);
		}
		else {
			callback(err, []);
		}
	});
}

module.exports.getCategory = function(db, categoryID, callback){
	var collection = db.collection('categories');
	collection.find({CatID: categoryID}).toArray(function(err, docs){
		if(docs && docs[0]){
			callback(err, docs[0]);
		}
		else {
			callback(err, null);
		}
	});
}