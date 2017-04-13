
module.exports = function(data) {
	return function(req,res,next) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		console.log('validate signedUp: ' +data.signedUp)
		console.log('validate: condition '+ data.condition);
		console.log('validate: notregistered '+ data.notregistered);
	if(data.condition){
		req.username = data.name;
		req.condition = data.condition;
		req.loggedIn = data.loggedIn;
		data.signedUp = true;
		req.signedUp = data.signedUp;
		req.notregistered = data.notregistered;
	} else {
		console.log('In else validate: notregistered '+ data.notregistered);
		if(!data.notregistered){
			console.log('in else validate IF');
		data.signedUp = true;
		req.signedUp = data.signedUp;
		req.notregistered = data.notregistered;
		req.condition = data.condition;
		}
	}
	next();
}
}