var categories = {
};

var expectedCount = 0;
var actualCount = 0;

//get the categories from the web service
module.exports.fetchCategories = function(db, callback){
	retrieveCategories(0);
	var categoriesManager = require('./../dataAccess/categoriesManager');
	var x = function(){
		if(actualCount < expectedCount){
			//the categories are not done fetching
			console.log(actualCount + ' / ' + expectedCount);
			setTimeout(x, 1000);
		}
		else {
			var catList = [];
			//transform dictionary into list
			for(catid in categories){
				catList.push(categories[catid]);
			}

			//insert the categories into the database
			categoriesManager.insertCategories(catList, db, function(err){
				callback(err, categories);
			});
		}
	}
	setTimeout(x, 1000);
}

//get all categories for a parent id and add the to the categories object
function retrieveCategories(parentId){
	expectedCount++;
	//get the products from the web service
	var http = require('http');

	var options = {
	    host: 'pcws.topline.ie',
	    path: '/json/syncreply/CategoryTree?ParentID=' + parentId
	}
	var request = http.request(options, function (res) {
	    var data = '';
	    res.on('data', function (chunk) {
	        data += chunk;
	    });
	    res.on('end', function () {
	    	var cats = JSON.parse(data).categoryTree;
	    	for(var i in cats){
	    		var cat = cats[i];
	    		categories[cat.CatID] = cat;
	    		retrieveCategories(cat.CatID);
	    	}
	    	actualCount++;
	    });
	});
	request.on('error', function (e) {
	    response.write('error');
	    end();
	});
	request.end();
}
