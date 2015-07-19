var db = require('../db.js');
module.exports.controller = function(app) {
//For all routes related to a post put them here
	
	app.get('/', function(req, res) {
    	if(!req.session.name) {
        	res.redirect('/login');
    	} else {
        	res.send("Welcome back " + req.session.name);
    	}
	});

	
	app.post('/login', function(req, res) {
    	bcrypt.hash(req.body.password, 10, function(err, hash) {
        	var userObj = {
            	username: req.body.name,
            	password: hash
        	};
        	req.session.name = req.body.name;
        	db.create('users', userObj, function(data) {
            	res.redirect('/');
        	})
    	});
	});

	app.get('/compare', function(req, res) {
    	res.render('home');
	});

	app.post('/compare', function(req, res) {
    	//created ne findbyColumn for this
    	db.findByColumn('users', 'username', req.body.username, function (data){
        	//how you sign in 
        	bcrypt.compare( req.body.password, data[0].password , function (err, result) {
            	req.session.currentUser = req.body.name;
            	res.send('youre logged in. happy reading.'); 
        	});
   		}); 
    	res.redirect('/');
	});

	app.get('/logout', function(req, res) {
  	// delete req.session.name;
  		req.session.name = null;
  		res.send('I have forgotten everything');
	});
}