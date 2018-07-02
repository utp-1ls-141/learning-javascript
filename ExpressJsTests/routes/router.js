"use strict";
let express = require('express');
let router = express.Router();
let user = require('../models/user');
let estudiante = require('../models/estudiante')

//LOGIN
router.get('/', function(req, res){
	res.render('index');
});

router.post('/', function(req, res, next){
	user.authenticate(req.body.email, req.body.password, function(error,user){
		if(error)
			next(error);
		else if(!user) {
			var err = new Error('Usuario o contraseña incorrecta');
            err.status = 401;
			next(err); }
		else{
			req.session.username = user.username;
			res.redirect('/profile');  }
	});
});

router.get('/profile',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	estudiante.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('profile',{usuario:req.session.username, modelo:users});
	}); 
});

//INSERTAR
router.post('/insertar', function(req, res, next){
	estudiante.insert(req.body.nombre,req.body.apellido,req.body.edad,req.body.cedula,req.body.correo,req.body.carrera,req.body.year,req.body.direccion,req.body.sexo,req.body.indice, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('cedula ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/profile');
	  });
});

//ACTUALIZAR
router.post('/actualizar', function(req, res, next){
	estudiante.update(req.body.nombre,req.body.apellido,req.body.edad,req.body.cedula,req.body.correo,req.body.carrera,req.body.year,req.body.direcion,req.body.sexo,req.body.indice, function(error,msg){
		console.log(req.body.cedula);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Usuario no existe');
			err.status = 401;
			next (err);}
		res.redirect('/profile');
		
	  });
});

//ELIMINAR
router.post('/eliminar', function(req, res, next){
	estudiante.delete(req.body.cedula, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('cedula no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/profile');}
	  });
});

module.exports = router;