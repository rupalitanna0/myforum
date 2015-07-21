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
		db.all('topics', function (topics){
			var data= {
				topics: topics
			}
			res.render('postNew', data);
		})
		
	});
	app.post('/posts', function(req, res){
		// var geo = geoip.lookup(req.ip);
		// var postObject = {
		// 	data_posted : req.body.data_posted,
		// 	user_id : req.session.currentuser,
		// 	topic_id : whatever,
		// 	location : geo.location
		// };
		db.create('posts', req.body, function (post){
			
				res.redirect('/topics');

	
		});

	});
	app.put('/updateVote', function (res, req){
		db.updateview('posts', 'votes', req.params.id, function(vote){
			var voteObj={
				votes: vote
			}
			res.render('/topics', voteObj);
		});
	});
	

}
