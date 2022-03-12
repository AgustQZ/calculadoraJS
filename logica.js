window.onload = function () {
    //Acciones tras cargar la página
    pantalla = document.getElementById("textoPantalla"); //elemento pantalla de salida
    document.onkeydown = teclado; //función teclado disponible
};

guardar = "0"; //guardar número en pantalla
iniciarPantalla = 1; //iniciar número en pantalla: 0=no, 1=si;
punto = 0; //estado coma decimal 0=no, 1=si;
enEspera = 0; //número oculto o en espera.
preOperacion = "no"; //operación en curso; "no" =  sin operación.

function numero(entrada) {
    //recoge el número pulsado en el argumento.
    if (guardar == "0" || iniciarPantalla == 1) {
        // inicializar un número,
        pantalla.innerHTML = entrada; //mostrar en pantalla
        guardar = entrada; //guardar número;
        if (entrada == ".") {
            //si escribimos una coma al principio del número
            pantalla.innerHTML = "0."; //escribimos 0.
            guardar = entrada; //guardar número
            punto = 1; //cambiar estado de la punto decimal
        }
    } else {
        //continuar escribiendo un número
        if (entrada == "." && punto == 0) {
            //si escribimos una coma decimal p�r primera vez
            pantalla.innerHTML += entrada;
            guardar += entrada;
            punto = 1; //cambiar el estado de la coma
        }
        //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
        else if (entrada == "." && punto == 1) {
        }
        //Resto de casos: escribir un número del 0 al 9:
        else {
            pantalla.innerHTML += entrada;
            guardar += entrada;
        }
    }
    iniciarPantalla = 0; //el número está iniciado y podemos ampliarlo.
}

function operar(signo) {
    igualar(); //si hay operaciones pendientes se realizan primero
    enEspera = guardar; //ponemos el 1� número en "numero en espera" para poder escribir el segundo.
    preOperacion = signo; //guardamos tipo de operación.
    iniciarPantalla = 1; //inicializar pantalla.
}

function igualar() {
    if (preOperacion == "no") {
        //no hay ninguna operación pendiente.
        pantalla.innerHTML = guardar; //mostramos el mismo número
    } else {
        //con operación pendiente resolvemos
        solucion = enEspera + preOperacion + guardar; // escribimos la operación en una cadena
        resultado = eval(solucion); //convertimos la cadena a código y resolvemos
        pantalla.innerHTML = resultado; //mostramos la solución
        guardar = resultado; //guardamos el resultado
        preOperacion = "no"; //ya no hay operaciones pendientes
        iniciarPantalla = 1; //se puede reiniciar la pantalla.
    }
}

function raizc() {
    guardar = Math.sqrt(guardar); //resolver raíz cuadrada.
    pantalla.innerHTML = guardar; //mostrar en pantalla resultado
    preOperacion = "no"; //quitar operaciones pendientes.
    iniciarPantalla = 1; //se puede reiniciar la pantalla
}

function porcent() {
    guardar = guardar / 100; //dividir por 100 el número
    pantalla.innerHTML = guardar; //mostrar en pantalla
    igualar(); //resolver y mostrar operaciones pendientes
    iniciarPantalla = 1; //reiniciar la pantalla
}

function opuest() {
    nx = Number(guardar); //convertir en número
    nx = -nx; //cambiar de signo
    guardar = String(nx); //volver a convertir a cadena
    pantalla.innerHTML = guardar; //mostrar en pantalla.
}

function inve() {
    nx = Number(guardar);
    nx = 1 / nx;
    guardar = String(nx);
    pantalla.innerHTML = guardar;
    iniciarPantalla = 1; //reiniciar pantalla al pulsar otro número.
}

function retro() {
    //Borrar sólo el último número escrito.
    cifras = guardar.length; //hayar número de caracteres en pantalla
    br = guardar.substr(cifras - 1, cifras); //info del último caracter
    guardar = guardar.substr(0, cifras - 1); //quitar el ultimo caracter
    if (guardar == "") {
        guardar = "0";
    } //si ya no quedan caracteres, pondremos el 0
    if (br == ".") {
        punto = 0;
    } //Si hemos quitado la coma, se permite escribirla de nuevo.
    pantalla.innerHTML = guardar; //mostrar resultado en pantalla
}

function borradoParcial() {
    pantalla.innerHTML = 0; //Borrado de pantalla;
    guardar = 0; //Borrado indicador número pantalla.
    punto = 0; //reiniciamos también la coma
}

function borradoTotal() {
    pantalla.innerHTML = 0; //poner pantalla a 0
    mostrar = "0"; //reiniciar número en pantalla
    punto = 0; //reiniciar estado coma decimal
    enEspera = 0; //indicador de número oculto a 0;
    preOperacion = "no"; //borrar operación en curso.
}

function teclado(elEvento) {
    evento = elEvento || window.event;
    k = evento.keyCode; //número de código de la tecla.
    //teclas númericas del teclado alfamunérico
    if (k > 47 && k < 58) {
        p = k - 48; //buscar número a mostrar.
        p = String(p); //convertir a cadena para poder añádir en pantalla.
        numero(p); //enviar para mostrar en pantalla
    }
    //Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
    if (k > 95 && k < 106) {
        p = k - 96;
        p = String(p);
        numero(p);
    }
    if (k == 110 || k == 190) {
        numero(".");
    } //teclas de coma decimal
    if (k == 106) {
        operar("*");
    } //tecla multiplicación
    if (k == 107) {
        operar("+");
    } //tecla suma
    if (k == 109) {
        operar("-");
    } //tecla resta
    if (k == 111) {
        operar("/");
    } //tecla división
    if (k == 32 || k == 13) {
        igualar();
    } //Tecla igual: intro o barra espaciadora
    if (k == 46) {
        borradoTotal();
    } //Tecla borrado total: "supr"
    if (k == 8) {
        retro();
    } //Retroceso en escritura : tecla retroceso.
    if (k == 36) {
        borradoParcial();
    } //Tecla borrado parcial: tecla de inicio.
}
