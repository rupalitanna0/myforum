var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var db = require('./db.js');
var session = require('express-session');
var bcrypt = require('bcrypt');
var fs = require('fs');
var bcrypt = require('bcrypt');
var session = require('express-session');
// var geoip = require('geoip-lite');
// var geo = geoip.lookup(ip);
// {
//    range: [ <low bound of IP block>, <high bound of IP block> ],
//    country: 'XX',                 // 2 letter ISO-3166-1 country code
//    region: 'RR',                  // 2 character region code.  For US states this is the 2 letter
//                                   // ISO-3166-2 subcountry code for other countries, this is the
//                                   // FIPS 10-4 subcountry code
//    city: "City Name",             // This is the full city name
//    ll: [<latitude>, <longitude>]  // The latitude and longitude of the city
// }
// console.log("The IP is %s", geoip.pretty(ip));

app.listen(3000);
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

