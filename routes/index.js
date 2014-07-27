var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res) {
  req.checkBody('user', 'SN Email Address is required').notEmpty();
  req.checkBody('pass', 'Password is required').notEmpty();
  // check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);  

  if (errors) {
    res.render('index', { flash: { type: 'alert-danger', messages: errors }});
  }
  else {
  	gumerPSN.init({		// Our PSN Module, we have to start it once. - irkinsander
	debug:		true				// Let's set it true, it's still in early development. So, report everything that goes wrong please.
	,email:		req.body.user //req.body.user		// A valid PSN/SCE account (can be new one) // TODO: Using the user's credentials to do this.
	,password:	req.body.pass //req.body.pass		// Account's password, du'h
	,npLanguage:	"ja"			// The language the trophy's name and description will shown as
	,region: 		"jp"			// The server region that will push data
		}, 
		function(isLogin)
		{
			if(isLogin)
			{
				console.log('We are in!');
				res.redirect('/psn');
			}
			else
			{
				console.log('We failed!');
				var newError = [ { param: 'pass', msg: 'Um... something happened. Enter your PSN Email Address and password and try again.', value: '' } ]
				res.render('index', { flash: { type: 'alert-danger', messages: newError }});
			}
		}
	);
  }
});

module.exports = router;
