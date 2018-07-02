"use strict";
const mongoose = require('mongoose');


 var estudianteSchema = new mongoose.Schema({
    nombre: { type: String, unique: false, required: false, trim: true },
    apellido: { type: String, unique: false, required: false, trim: true },
    edad: { type: Number, unique: false, required: false, trim: true },
    cedula: { type: String, unique: true, required: false, trim: true },
    correo: { type: String, unique: false, required: false, trim: true },
    carrera: { type: String, unique: false, required: false, trim: true },
    year: { type: String, unique: false, required: false, trim: true },
    direccion: { type: String, unique: false, required: false, trim: true },
    sexo: { type: String, unique: false, required: false, trim: true },
    indice: { type: Number, unique: false, required: false, trim: true },
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
estudianteSchema.statics.update = function(nombre,apellido,edad,cedula,correo,carrera,year,direccion,sexo,indice,callback){
    Estudiante.findOne({cedula:cedula},'nombre apellido edad correo year direccion sexo indice',function(err,user){
        if(err)
            return callback(err);
        else if(!user){
            console.log(user);
            return callback();
        }
        else{
                if(nombre)
                    user.nombre = nombre;
                if(apellido)
                    user.apellido=apellido;
                if(edad)
                    user.edad = edad;               
                if(correo)
                    user.correo = correo;
                if(carrera)
                    user.carrera = carrera;
                if(year)
                    user.year = year;
                if(direccion)
                    user.direccion = direccion;
                if(sexo)
                    user.sexo = sexo;
                if(indice)
                    user.indice = indice;
                user.save(function(err){
                    if(err)
                        return callback(err);
                    return callback(null,true);
                });
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

