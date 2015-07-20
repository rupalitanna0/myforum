var db = require('../db.js');
var bcrypt = require('bcrypt');




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
    app.get('/home', function (req, res){
        res.render('home');
    })
    app.get('/signUp', function (req, res){
        res.render('signup');
    })
	
	app.post('/signUp', function(req, res) {
    	bcrypt.hash(req.body.password, 10, function(err, hash) {
            
        	var userObj = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            	username: req.body.username,
            	password: hash
        	};

            db.create('users', userObj, function(user) {
                
        	   req.session.currentUser = user.id;
               console.log(req.session)
               res.redirect('/');
        	})
    	});
	});

	app.get('/compare', function(req, res) {
    	res.render('home');
	});

	app.post('/login', function(req, res) {
        db.getUser('users', req.body.username, function (user) {
         var passwordCorrect = bcrypt.compare(req.body.password, user.password, function (err, result) {
             if(result){
                req.session.currentuser = user.id;
                res.redirect('/topics')
             } else {
                res.send('Incorrect username or password');
                res.redirect('/login')
             }
         }) 
        })
    });

	app.get('/logout', function(req, res) {
  	// delete req.session.name;
  		req.session.name = null;
        res.redirect('/home')
  		res.send('I have forgotten everything');
	});

	

}