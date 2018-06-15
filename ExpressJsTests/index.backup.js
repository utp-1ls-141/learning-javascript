var express = require('express');
var app = express();

// Rutas
app.get('/', function(req, res){
	res.send('Hello');
});

app.get('/clientes', function(req, res) {
	res.send('Clientes');
});

app.get('/api/clientes/', function(req, res) {
	var clientes = [
		{
			nombre: 'Erick',
			apelldio: 'Agrazal',
			edad: 27
		},
		{
			nombre: 'Manuel',
			apelldio: 'Fernandez',
			edad: 22
		}
		,{
			nombre: 'Héctor',
			apelldio: 'Vasquez',
			edad: 22
		}
	]

	res.send(JSON.stringify(clientes));
});

app.post('/api/clientes', function(req, res){
	var creado = {
		nombre: 'Maureth',
		apellido: 'Samudio',
		edad: 21,
	}
	res.send(JSON.stringify(creado));
});

app.put('/api/clientes/1', function(req, res){
	var editado = {
		nombre: 'Pedro',
		apellido: 'Ramos',
		edad: 25,
	};
	res.send(JSON.stringify(editado));
})

app.delete('/api/clientes/1', function(req, res){
	var eliminado = {
		nombre: 'Hector',
		apellido: 'Vasquez',
		edad: 22,
	};
	res.send(JSON.stringify(eliminado));
})

app.listen(3000, function(){ console.log('Escuchando en el puerto 3000...') });