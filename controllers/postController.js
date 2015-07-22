var db = require('../db.js');
// var geoip = require('geoip-lite');

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
		// var geo = geoip.lookup('207.97.227.239');
		// console.log(geo);
		// var postObject = {
		// 	data_posted : req.body.data_posted,
		// 	user_id : req.session.currentuser,
		// 	topic_id : whatever,
		// 	location : geo.location
		// };
		// var postObj = req.body;
		// postObj.location = geo.city;

		db.create('posts', req.body, function (post){
				
				res.redirect('/topics');

			
		});


	});
	app.post('/updateVote', function (req, res){
		
		db.updateview('posts', 'votes', req.body.id, function(vote){
			var voteObj={
				votes: vote
			}
			res.redirect('/topics/'+req.body.id);
		});
	});
	

}
