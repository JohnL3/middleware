var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var login = express.Router();
login.use(bodyParser.json());



login.route('/')
.get(function(req,res,next) {
	console.log('in login page')
	res.sendFile(path.join(__dirname, '/login.html'));
	
})
.post(function (req, res, next) {
    console.log('user login THIS ONE ' + req.notregistered);  
	
	if(req.notregistered === false){
	res.redirect('/');
	} else {
		res.end('Wrong details try again or signup');
	}
	
	
})



module.exports = login;