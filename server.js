// BASE SETUP
// Packages configuration

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
  config = require('./config'),
	path = require('path');

// APP CONFIGURATION
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configurating a static file serving middleware
app.use(express.static(__dirname + '/public'));

// configure our app to handle CORS requests
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// MAIN CATHALL ROUTE
// SEND USERS TO FRONTEND
// has to be registered after API ROUTES
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

// start the server
app.listen(config.port);
console.log('Magic happens on port ' + config.port + '.');
