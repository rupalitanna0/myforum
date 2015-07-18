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

};


