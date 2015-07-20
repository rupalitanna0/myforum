var db = require('../db.js');

module.exports.controller = function(app) {

	app.get('/topics', function (req, res){
		db.all('topics', function(data){
			var topic = {
				topics: data
			}
			res.render('topicsShow', topic);
		});
	});
	// app.get('/topics/:id', function(req, res){
	// 	db.find('topics', req.params.id, function (topicData){
	// 		console.log(topicData);
	// 		db.findRelations('posts', 'topic_id', req.params.id, function (postsData){
	// 			db.findUserName('username', 'posts', 'users', 'user_id', function (userData){
					
	// 				var topicObj = {
	// 					topic: topicData[0],
	// 					posts: postsData,
	// 					user: userData.username
	// 				};
	// 				console.log("THIS IS USEROBJ", topicObj);
	// 				res.render('topicWithPost', topicObj)
	// 			});
	// 		});
	// 	});

	// });
	app.get('/topics/new', function (req, res){
		db.all('topics', function (topics){
			var data = {
				topics: topics
			};
			res.render('topicNew', data);
		});
	});

	app.post('/topics', function (req, res){
		db.create('topics', req.body, function (topic){
			res.redirect('/topics')
		});
	});
};


