let express = require('express');
let router = express.Router();
let user = require('../models/user');
let estudiante = requiere('../models/estudiante')
let bcrypt = require('bcrypt');
let datos;

//LOGIN
router.get('/', function(req, res){
	res.render('index');
});
router.post('/', function(req, res, next){
	var cont;
	bcrypt.hash(req.body.password+'', 10, function(err, hash) {
		cont = hash;
	});
	/* Si desearamos el proceso inverso
	    bcrypt.compare('somePassword', hash, function(err, res) {
      		if(res) {
       			// Passwords coinciden
      		} else {
       			// Passwords no coinciden
      		} 
    	});
	*/
	user.authenticate(req.body.email, cont, function(error,user){
		if(error || !user)
		return next(error);
		else{
		req.session.username=user.username;
		res.redirect('/profile');}
	  });
});

router.get('/profile',function(req,res,next){
	if(!req.session.username){
		res.send('denegado');
	}
/* 	estudiante.read(function(error,msg,coll){
		if(error)
		return next(error);
		else if(msg){
		res.send(msg)}
		else{
		datos=coll;
		}
	  }); */
	res.render('profile',{message:req.session.username,modelo:[{nombre:'manuel'}]});
});

//INSERTAR
router.post('/insertar', function(req, res, next){
	estudiante.authenticate(req.body.nombre,req.body.apellido,req.body.edad,req.body.cedula,req.body.correo,req.body.carrera,req.body.year,req.body.direcion,req.body.sexo,req.body.indice, function(error,msg){
		if(error)
		return next(error);
		else{
		res.send(msg)}
	  });
});

//ACTUALIZAR
router.post('/actualizar', function(req, res, next){
	estudiante.update(req.body.nombre,req.body.apellido,req.body.edad,req.body.cedula,req.body.correo,req.body.carrera,req.body.year,req.body.direcion,req.body.sexo,req.body.indice, function(error,msg){
		if(error)
		return next(error);
		else{
		res.send(msg)}
	  });
});

//ELIMINAR
router.post('/eliminar', function(req, res, next){
	estudiante.delete(req.body.cedula, function(error,msg){
		if(error)
		return next(error);
		else{
		res.send(msg)}
	  });
});

module.exports = router;