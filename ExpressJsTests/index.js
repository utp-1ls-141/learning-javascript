var mongoose = require('mongoose');

var express = require('express');
var app = express();
const path = require('path');

// Connect to mongo
var UserModel = require('./models/users');
console.log(UserModel);
mongoose.connect('mongodb://localhost/semestral');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function(){ console.log('Connected to database.') });

// Setting View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', function(req, res){
	res.render('index');
});

app.get('/greet/:name', function(req, res){
	res.render('greetAPerson', {
		name: req.params.name,
	});
});

// Open listening port
// Set PORT:
// Mac / Linux: export NODE_JS_PORT=3000
const port = process.env.NODE_JS_PORT || 3000;
app.listen(port, function(){ console.log(`Escuchando en el puerto ${port}...`) });