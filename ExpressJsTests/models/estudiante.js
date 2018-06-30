"use strict";
const mongoose = require('mongoose');


 var estudianteSchema = new mongoose.Schema({
    nombre: { type: String, unique: true, required: true, trim: true },
    apellido: { type: String, unique: false, required: true, trim: true },
    edad: { type: Number, unique: false, required: true, trim: true },
    cedula: { type: String, unique: false, required: true, trim: true },
    correo: { type: String, unique: false, required: true, trim: true },
    carrera: { type: String, unique: false, required: true, trim: true },
    year: { type: String, unique: false, required: true, trim: true },
    direccion: { type: String, unique: false, required: true, trim: true },
    sexo: { type: String, unique: false, required: true, trim: true },
    indice: { type: Number, unique: false, required: true, trim: true },
},{collection:'estudiantes'});


estudianteSchema.statics.findAll = function(callback){
    Estudiante.find({},function(err,users) {
        if(err)
            return callback(err);
        else if(!users)
            return callback();
        return callback(null,users);
    })
}

estudianteSchema.statics.insert = function(nombre,apellido,edad,cedula,correo,carrera,year,direccion,sexo,indice,callback){
    Estudiante.findOne({cedula:cedula},'cedula',function(err,user){
        if(err){
            return callback(err)
        }
        else if(user){
            return callback(user);
        }
        else{
            var data={
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                cedula:cedula,
                correo:correo,
                carrera:carrera,
                year:year,
                direccion:direccion,
                sexo:sexo,
                indice:indice};
            Estudiante.create(data,function(err){
                if(err)
                    return callback(err);
                return callback();
            })}
    })   
}
estudianteSchema.statics.update = function(nombre,apellido,edad,cedula,correo,year,direccion,sexo,indice,callback){
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

            Estudiante.updateOne(
                {cedula:cedula},
                {

                nombre:nombre,
                apellido:apellido,
                edad:edad,                
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

estudianteSchema.statics.delete = function(cedula,callback){
    Estudiante.findOne({cedula:cedula},'cedula',function(err,users){
        if(err)
            return callback(err);
        else if(!users)
            return callback(null,'cedula no existe');
        Estudiante.deleteOne({cedula:cedula}, function(err){
                if(err)
                    return callback(err);
                return callback();//Success
            });
    })   
}

let Estudiante = mongoose.model('Estudiante',estudianteSchema);

module.exports = Estudiante;

