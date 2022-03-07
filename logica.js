window.onload = function () {
    //Acciones tras cargar la página
    pantalla = document.getElementById("textoPantalla"); //elemento pantalla de salida
};

x = "0"; //guardar número en pantalla
xi = 1; //iniciar número en pantalla: 1=si; 0=no;
coma = 0; //estado coma decimal 0=no, 1=si;
ni = 0; //número oculto o en espera.
op = "no"; //operación en curso; "no" =  sin operación.

function numero(xx) {
    //recoge el número pulsado en el argumento.
    if (x == "0" || xi == 1) {
        // inicializar un número,
        pantalla.innerHTML = xx; //mostrar en pantalla
        x = xx; //guardar número;
        if (xx == ".") {
            //si escribimos una coma al principio del número
            pantalla.innerHTML = "0."; //escribimos 0.
            x = xx; //guardar número
            coma = 1; //cambiar estado de la coma
        }
    } else {
        //continuar escribiendo un número
        if (xx == "." && coma == 0) {
            //si escribimos una coma decimal p�r primera vez
            pantalla.innerHTML += xx;
            x += xx;
            coma = 1; //cambiar el estado de la coma
        }
        //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
        else if (xx == "." && coma == 1) {
        }
        //Resto de casos: escribir un número del 0 al 9:
        else {
            pantalla.innerHTML += xx;
            x += xx;
        }
    }
    xi = 0; //el número está iniciado y podemos ampliarlo.
}

function operar(s) {
    igualar(); //si hay operaciones pendientes se realizan primero
    ni = x; //ponemos el 1� número en "numero en espera" para poder escribir el segundo.
    op = s; //guardamos tipo de operación.
    xi = 1; //inicializar pantalla.
}

function igualar() {
    if (op == "no") {
        //no hay ninguna operación pendiente.
        pantalla.innerHTML = x; //mostramos el mismo número
    } else {
        //con operación pendiente resolvemos
        sl = ni + op + x; // escribimos la operación en una cadena
        sol = eval(sl); //convertimos la cadena a código y resolvemos
        pantalla.innerHTML = sol; //mostramos la solución
        x = sol; //guardamos la solución
        op = "no"; //ya no hay operaciones pendientes
        xi = 1; //se puede reiniciar la pantalla.
    }
}

function raizc() {
    x = Math.sqrt(x); //resolver raíz cuadrada.
    pantalla.innerHTML = x; //mostrar en pantalla resultado
    op = "no"; //quitar operaciones pendientes.
    xi = 1; //se puede reiniciar la pantalla
}

function porcent() {
    x = x / 100; //dividir por 100 el número
    pantalla.innerHTML = x; //mostrar en pantalla
    igualar(); //resolver y mostrar operaciones pendientes
    xi = 1; //reiniciar la pantalla
}

function opuest() {
    nx = Number(x); //convertir en número
    nx = -nx; //cambiar de signo
    x = String(nx); //volver a convertir a cadena
    pantalla.innerHTML = x; //mostrar en pantalla.
}

function inve() {
    nx = Number(x);
    nx = 1 / nx;
    x = String(nx);
    pantalla.innerHTML = x;
    xi = 1; //reiniciar pantalla al pulsar otro número.
}

function retro() {
    //Borrar sólo el último número escrito.
    cifras = x.length; //hayar número de caracteres en pantalla
    br = x.substr(cifras - 1, cifras); //info del último caracter
    x = x.substr(0, cifras - 1); //quitar el ultimo caracter
    if (x == "") {
        x = "0";
    } //si ya no quedan caracteres, pondremos el 0
    if (br == ".") {
        coma = 0;
    } //Si hemos quitado la coma, se permite escribirla de nuevo.
    pantalla.innerHTML = x; //mostrar resultado en pantalla
}

function borradoParcial() {
    pantalla.innerHTML = 0; //Borrado de pantalla;
    x = 0; //Borrado indicador número pantalla.
    coma = 0; //reiniciamos también la coma
}

function borradoTotal() {
    pantalla.innerHTML = 0; //poner pantalla a 0
    x = "0"; //reiniciar número en pantalla
    coma = 0; //reiniciar estado coma decimal
    ni = 0; //indicador de número oculto a 0;
    op = "no"; //borrar operación en curso.
}
