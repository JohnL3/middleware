var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var logout = express.Router();
logout.use(bodyParser.json());

logout.route('/')
.get(function(req,res,next) {
	
	console.log('in logout page: loggedIn '+req.loggedIn);
	console.log('in logout page: condition '+req.condition);
	console.log('in logout page: signedUp ' +req.signedUp);
	console.log('in logout page: notregistered ' +req.notregistered);
	
	res.redirect('/');
	
})
.post(function (req, res, next) {
    console.log('user logout THIS ONE ');  
	
	res.redirect('/');
	
})

module.exports = logout;