var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var user = express.Router();
user.use(bodyParser.json());

user.route('/')
.get(function(req,res,next) {
	console.log('in signUp page '+__dirname)
	res.sendFile(path.join(__dirname, '/signup.html'));
	
})
.post(function (req, res, next) {
    console.log('user FORM THIS ONE ');  

	res.redirect('/');
	
})

module.exports = user;