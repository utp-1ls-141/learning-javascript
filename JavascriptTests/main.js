(function (){
    // Primera prueba
    // alert("Hola mundo");

    // Segunda prueba
    document.getElementById("reemplazame").innerHTML = 5 + 5;
    console.log(5 + 5);

    // Tercera prueba
    var nombre="Erick", apellido="Agrazal";
    console.log("El profesor es: " + nombre + " " + apellido + ".");

    var estudiante;
    console.log("Estudiante que van a pasar: " + estudiante);

    // CALLBACKS
    // function sumar(a, b, callback){
    //     return callback(a + b);
    // }

    // function __callback(a){
    //     return a / 2;
    // }

    // sumar(4, 5, __callback);

    function sortNumber(a, b) {
        return a - b;
    }

    function __sort(a){
        return a.sort(sortNumber);
    }

    function __add(a){
        var acum = 0;
        for (var i = 0; i < a.length; i++) {
            acum += a[i];
        }
        return acum;
    }

    function randomGenerator(callback){
        var quantity = 5, randoms = [];

        for (var i = 0; i < quantity; i++) {
            randoms.push(Math.floor((Math.random() * 10) + 1));
        }
        console.log(randoms);
        return typeof(callback) !== "undefined"? callback(randoms): randoms;
    }
    console.log(randomGenerator());
    console.log(randomGenerator(__sort));
    console.log(randomGenerator(__add));
})();