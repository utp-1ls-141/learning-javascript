// IMPORTANTE crear la base de datos con: use nombredelabd
// si no crean la base de datos como primer paso la coleccion se creara en test que es la db por defecto de mongo
// en mi caso usare:  'use aprendiendo'

db.createUser({user:'Nicole',pwd:'nickyeslobest',roles:[{role:'readWrite',db:'aprendiendo'}]});
//db.auth('Nicole','nickyeslobest');   [por si algun dia necesitamos usar Authetication]
// NO CREAR ESTE USUARIO MAS DE 1 VEZ
db.createCollection('users');
db.users.insertOne({
    email:'manfer1804@gmail.com',
    username:'manuelf',
    password:'$2a$10$mriWdK7P3Uitat6SR4LkNekr1RbaCYw79hU9CfUAtqGNiWLR6uUDe', //holis
    passConfirm:'$2a$10$mriWdK7P3Uitat6SR4LkNekr1RbaCYw79hU9CfUAtqGNiWLR6uUDe' //holis hash
});
// Para hacer un query a la bd y probar que funciona pueden hacer
// db.estudiantes.find({}).pretty()
// esto es equivalente a el clasico 'Select * from estudiantes'
// el pretty al final es opcional
// Para conectarse a la base de datos como Nicole '$mongo -u Nicole -p' esto les pedira la contrasena
