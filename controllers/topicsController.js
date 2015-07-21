var db = require('../db.js');

module.exports.controller = function(app) {

	app.get('/topics', function (req, res){
		db.des('topics', 'views', function(data){
			db.findUserName('username', 'topics', 'users', 'user_id', function (userData){
				var topic = {
					topics: data,
					user: userData[0]
				}
				res.render('topicsShow', topic);
			});
			
		});
	});
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
	app.get('/topics/:id', function(req, res){
		db.find('topics', req.params.id, function (topicData){
			console.log(topicData);
			db.findRelations('posts', 'topic_id', req.params.id, function (postsData){
				db.findUserName('*', 'posts', 'users', 'user_id', function (userData){
					db.updateview('topics', 'views', req.params.id, function (view){	
					var topicObj = {
						topic: topicData[0],
						posts: postsData,
						user: userData,
						views: view[0]
					};
					console.log("THIS IS USEROBJ", topicObj);
					res.render('topicWithPost', topicObj)
					// var data = {
					// 	topic: topicData[0],
					// 	posts: userData
					// 	user: userData
					// };
					// console.log('#########################this is data',data);
					// res.render('topicWithPost',data);
				});
				});
			});
		});
	});
	
};


