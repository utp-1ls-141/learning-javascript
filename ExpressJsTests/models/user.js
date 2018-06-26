const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email:{type:String,unique:true,required:true,trim:true},
    username:{type:String,unique:false,required:true,trim:true},
    password:{type:String,unique:false,required:true,trim:true},
    passConfirm:{type:String,unique:false,required:true,trim:true},
},{collection:'users'});

userSchema.statics.authenticate = function(email,password,callback){
    User.findOne({email:email,password:password},'username',function(err,users){
        if(err){
            console.log(err);
        }
        else if(!users){
            var err = new Error('Usuario o password incorrectos');
            err.status = 401;
            return callback(err);
        }
        else{
            console.log(users);
            return callback(null,users);
        }
    })   
}


let User = mongoose.model('User',userSchema);


module.exports = User;