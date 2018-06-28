const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    username: { type: String, unique: false, required: true, trim: true },
    password: { type: String, unique: false, required: true, trim: true },
    passConfirm: { type: String, unique: false, required: true, trim: true },
},{collection:'users'});

 var estudianteSchema = new mongoose.Schema({
    nombre: { type: String, unique: true, required: true, trim: true },
    apellido: { type: String, unique: false, required: true, trim: true },
    edad: { type: String, unique: false, required: true, trim: true },
    cedula: { type: String, unique: false, required: true, trim: true },
    correo: { type: String, unique: false, required: true, trim: true },
    carrera: { type: String, unique: false, required: true, trim: true },
    year: { type: String, unique: false, required: true, trim: true },
    direccion: { type: String, unique: false, required: true, trim: true },
    sexo: { type: String, unique: false, required: true, trim: true },
    indice: { type: String, unique: false, required: true, trim: true },
},{collection:'estudiantes'});

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

estudianteSchema.statics.insert = function(nombre,apellido,edad,cedula,correo,carrera,year,direccion,sexo,indice,callback){
    Estudiante.findOne({cedula:cedula},'cedula',function(err,users){
        if(err){
            console.log(err);
        }
        else if(users){
            var err = new Error('esta cedula ya existe en la base de datos');
            err.status = 401;
            return callback(err);
        }
        else{
            console.log(users);

            Estudiante.insertOne({
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                cedula:cedula,
                correo:correo,
                carrera:carrera,
                year:year,
                direccion:direccion,
                sexo:sexo,
                indice:indice

            });

            return callback(null,users);

            

        }
    })   
}
estudianteSchema.statics.update = function(nombre,apellido,edad,cedula,correo,carrera,year,direccion,sexo,indice,callback){
    Estudiante.findOne({cedula:cedula},'cedula',function(err,users){
        if(err){
            console.log(err);
        }
        else if(!users){
            var err = new Error('esta cedula no existe en la base de datos');
            err.status = 401;
            return callback(err);
        }
        else{
            console.log(users);

            Estudiante.updateOne({
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                cedula:cedula,
                correo:correo,
                carrera:carrera,
                year:year,
                direccion:direccion,
                sexo:sexo,
                indice:indice

            });

            return callback(null,users);

            

        }
    })   
}

let User = mongoose.model('User',userSchema);
let Estudiante = mongoose.model('Estudiante',estudianteSchema);

module.exports = User;
module.exports = Estudiante;

