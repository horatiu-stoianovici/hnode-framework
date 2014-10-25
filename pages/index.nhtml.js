module.exports.handleRequest = function(server, render, end){

	//constructing a list of get parameters
	var getParams = [];
	for(var p in server.get){
		getParams.push({
			name: p,
			value: server.get[p]
		});
	}

	//rendering the view
	render({
		message: 'Hello my world!',
		title: 'My first test',
		getParams: getParams
	});
}