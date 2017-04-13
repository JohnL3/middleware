var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('in the index route ');
	console.log('in the index route: signedUp '+req.signedUp);
	console.log('in the index route: condition: '+req.condition);
	console.log('in the index route: notregistered: '+req.notregistered);
  res.render('index', {
	  title: 'Cool, huh!',
	  name:req.username,
	  condition: req.condition,
	  loggedin:req.loggedIn,
	  signedUp:req.signedUp,
	  notregistered:req.notregistered,
	  anyArray: ['signedUp: '+req.signedUp,'notregistered: '+req.notregistered,'condition: '+req.condition],
	  action: "Working hard"
	  });
});

module.exports = router;