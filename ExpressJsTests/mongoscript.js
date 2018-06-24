// IMPORTANTE crear la base de datos con: use nombredelabd
// si no crean la base de datos como primer paso la coleccion se creara en test que es la db por defecto de mongo
// en mi caso usare:  'use aprendiendo'

db.createUser({user:'Nicole',pwd:'nickyeslobest',roles:[{role:'readWrite',db:'aprendiendo'}]});
//db.auth('Nicole','nickyeslobest');   [por si algun dia necesitamos usar Authetication]
db.createCollection('estudiantes');
db.estudiantes.insertOne({
    nombre:'Maureth',
    edad:20,
    hobbies:['cantar','bailar','dormir']
});
// Para hacer un query a la bd y probar que funciona pueden hacer
// db.estudiantes.find({}).pretty()
// esto es equivalente a el clasico 'Select * from estudiantes'
// el pretty al final es opcional
// Para conectarse a la base de datos como Nicole '$mongo -u Nicole -p' esto les pedira la contrasena
