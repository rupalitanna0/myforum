var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var db = require('./db.js');
var fs = require('fs');
var geoip = require('geoip-lite');
var bcrypt = require('bcrypt');
var session = require('express-session');
//

app.listen(3000);
// app.set('port', (process.env.PORT || 3000));
// app.listen(app.get('port'), function () {
//   console.log("App running on port : ", app.get('port'));
// });
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(logger('dev'));
app.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	  // look in urlencoded POST bodies and delete it
	  var method = req.body._method
	  delete req.body._method
	  return method
	}
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'allthethings',
  saveUninitialized: false,
  resave: false
}));
fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     route.controller(app);
 }
});

app.get('/', function (req, res){
	res.render('home');
})

