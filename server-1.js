var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

port = process.env.PORT || 8080;


var routes = require('./routes/index');
var user = require('./routes/user');
var logout = require('./routes/logout');
var login = require('./routes/login');
var app = express();

var validate = require('./customMiddleware');
var val_Login = require('./loginMiddleware');

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

var data ={
	condition:false,
	notregistered:true,
	signedUp:false,
	loggedIn: false
	};

/*var validate = function(req,res,next) {
	if(data.condition){
		req.username = data.name;
		req.condition = data.condition;
		req.loggedIn = data.loggedIn;
	}
	next();
}*/

/*var val_Login = function(req,res,next){
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
}*/
//app.use('/',validate(data));

app.all('/',validate(data), function(req,res, next){
	console.log('In the Index all');
	console.log('Index all: SignedUp '+ req.signedUp);
	console.log('Index all: condition '+ req.condition);
	console.log('Index all: notregistered '+ req.notregistered);
	/*if(data.condition){
		req.username = data.name;
		req.condition = data.condition;
	}*/
	
	next();
});
app.use('/', routes);


app.all('/signup', function(req,res, next){
	console.log('In the FORM all ');
	if(req.method !== "GET"){
	if(data.condition !== true){
	//console.log('signup Headers: '+JSON.stringify(req.headers));
	var encrypt = req.body.encrypt;
	
	var decodedData = new Buffer(encrypt, 'base64').toString().split(':');
	
	var username = decodedData[0];
	var password = decodedData[1];
	
	req.username = username;
	(username)? data.name = username:false;
	(username)? data.condition = true:data.condition=false;
	(password)? data.password = password:false;
	data.loggedIn = true;
	req.loggedIn = data.loggedIn;
	data.signedUp = true;
	req.signedUp = data.signedUp;
	data.notregistered = false;
	req.notregistered = data.notregistered;
	}
	}
	
	next();
});
app.use('/signup',user);

app.all('/logout',function(req,res,next){
	console.log('in logout All: loggedIn '+data.loggedIn);
	console.log('in logout All: condition '+data.condition);
	console.log('in logout All: signedUp ' +data.signedUp);
	console.log('in logout All: notregistered ' +data.notregistered);
	if(data.loggedIn === true){
		data.loggedIn = false;
		data.condition = false;
		req.loggedIn = data.loggedIn;
		req.condition = data.condition;
		data.signedUp = true;
		req.signedUp = data.signedUp;
		req.notregistered = data.notregistered;
		next();
	} else {
		next();
	}
});
app.use('/logout',logout);

app.all('/login', val_Login(data), function(req,res,next){
	console.log('In the login all: '+ req.notregistered);

	next();
});
app.use('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log('err function');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	console.log('err function: development');
  app.use(function(err, req, res, next) {
	  console.log('err function: development');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message+' '+err.status,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.log('err function: production');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(port, function(){
  console.log('app running port: 8080');
});


