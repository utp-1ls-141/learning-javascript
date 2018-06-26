let express = require('express');
let app = express();
const path = require('path');

let mongoose = require('mongoose');

// Mongoose Connection
mongoose.connect('mongodb://localhost/semestral');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión: '))
db.once('open', () => {
	console.log('Conectado a la Base de Datos.');
});

// Setting View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
let routes = require('./routes/router');
app.use('/', routes);
app.use(function(req, res, next){
	let error = new Error('Archivo no encontrado');
	error.status = 404;
	next(error);
})

// Open listening port
// Set PORT:
// Mac / Linux: export NODE_JS_PORT=3000
const port = process.env.NODE_JS_PORT || 3000;
app.listen(port, function(){ console.log(`Escuchando en el puerto ${port}...`) });