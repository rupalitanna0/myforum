var db = require('../db.js');

module.exports.controller = function(app) {
//For all routes related to a post put them here
	app.get('/posts', function (req, res){
		db.all('posts', function (posts){
			var data = {
				posts: posts
			};
			res.render('post', data);
		});

	});
	
	app.get('/posts/new', function (req, res){
		res.render('postNew');
	});
	app.post('/posts/new', function(req, res){
		db.create('posts', req.body, function (post){
			res.render('posts');
		});

	});
	

}
