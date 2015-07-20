var db = require('../db.js');
var bcrypt = require('bcrypt');
var session = require('express-session');

app.use(session({
  secret: 'allthethings',
  saveUninitialized: false,
  resave: false
}));

module.exports.controller = function(app) {
//For all routes related to a post put them here
	app.get('/login', function (req, res){
		res.render('login');
	});
	
	
	app.get('/', function(req, res) {
    	if(!req.session.name) {
        	res.redirect('/login');
    	} else {
        	res.send("Welcome back " + req.session.name);
    	}
	});

	
	app.post('/login', function(req, res) {
    	bcrypt.hash(req.body.password, 10, function(err, hash) {
            var geo = geoip.lookup('65.199.32.26');
            console.log("the ip address location ###" + geo);
        	var userObj = {
            	username: req.body.name,
            	password: hash
        	};

        	req.session.name = req.body.name;
        	db.create('users', userObj, function(data) {
            	res.redirect('/topics');
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
    	res.redirect('/topics');
	});

	app.get('/logout', function(req, res) {
  	// delete req.session.name;
  		req.session.name = null;
  		res.send('I have forgotten everything');
	});

	

}