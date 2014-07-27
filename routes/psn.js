var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('psn', { title: 'PSN Batch App' });
});

router.post('/', function(req, res) {
	var user = req.body.id;
	console.log(req.body.id);
	console.log(req.body.requestMessage);
	gumerPSN.sendFriendRequest(req.body.id, req.body.requestMessage, function(error, sendFriendRequestData) {
		if (!error) {
			console.log('success!' + user);
			var json = { error: false, message: user + " - Successfully sent!", response: sendFriendRequestData };
			res.json(json);
		}
		else {
			console.log('failed! ' + user);
				res.json({
					error: true, message: user + " - Spectacularly failed!", response: sendFriendRequestData
				});
		}
	})
});

module.exports = router;
