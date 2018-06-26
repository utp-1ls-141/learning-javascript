const mongoose = require(mongoose);

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email:{type:String,unique:true,required:true,trim:true},
    username:{type:String,unique:true,required:true,trim:true},
    password:{type:String,unique:true,required:true,trim:true},
    passconfirm:{type:String,unique:true,required:true,trim:true},
},{collection:'user'});


let User = mongoose.model('user',userSchema);

exports = User 