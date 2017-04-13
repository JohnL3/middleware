module.exports = function(data) {
	
	return function(req,res,next){
	console.log('in val_Login '+req.method);
	if(req.method !== "GET"){	
	var encrypt = req.body.encrypt;
	var decodedData = new Buffer(encrypt, 'base64').toString().split(':');
	var username = decodedData[0];
	var password = decodedData[1];
	req.username = username;
	req.password = password;
	
	if(data.password === password && data.name === username){
		console.log('in val_Login pass');
		data.loggedIn = true;
		data.condition = true;
		req.loggedIn = data.loggedIn;
		data.notregistered = false;
		console.log('in val_Login pass '+data.notregistered);
		req.notregistered = data.notregistered;
		data.signedUp = true;
		req.signedUp = data.signedUp;
		next();
	} else {
		console.log('in else if pass');
		data.notregistered = true;
		req.notregistered = data.notregistered;
		next();
	}
	} else {
		console.log('in else if GET');
		next();
	}
}
}