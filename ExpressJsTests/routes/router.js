let express = require('express');
let router = express.Router();
let user = require('../models/user');
let md5 = require('md5');

router.get('/', function(req, res){
	res.render('index');
});
router.post('/', function(req, res, next){
	var cont = md5(req.body.password+'');
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
		res.send('denegado')
	}
	res.render('profile',{message:req.session.username});
});
router.get('/greet/:name', function(req, res){
	res.render('greetAPerson', {
		name: req.params.name,
	});
});

module.exports = router;