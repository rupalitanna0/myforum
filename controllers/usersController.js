var db = require('../db.js');
module.exports.controller = function(app) {
//For all routes related to a post put them here
	app.get('/login', function (req, res){
		res.render('login');
	});
	app.get('/signup', function (req, res){
		res.render('signup');
	});
}