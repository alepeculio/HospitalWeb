var tel = 0;

var caracteresNoPermitidos = "~`!@#$%^&*()_+-=[]{};':\",.<>/?\\|0123456789";
var filtroTelefono = /^([0-9])+$/;
var filtroCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var departamentos = ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Rio Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"];
var ciudades = [
    ["Artigas", "Bella Unión"],
    ["Ciudad de la Costa", "Las Piedras", "Barros Blancos", "Pando", "La Paz", "Canelones", "Santa Lucía", "Progreso", "Paso Carrasco", "Joaquín Suárez", "Toledo", "General Líber Seregni", "Atlántida", "Salinas", "Parque del Plata", "San Ramón", "Sauce", "Tala"],
    ["Melo", "Río Branco"],
    ["Colonia del Sacramento", "Carmelo", "Nueva Helvecia", "Juan Lacaze", "Rosario", "Nueva Palmira", "Tarariras"],
    ["Durazno", "Sarandí del Yí"],
    ["Trinidad"],
    ["Florida", "Sarandí Grande"],
    ["Minas", "José Pedro Varela"],
    ["Maldonado", "San Carlos", "Punta del Este", "Piriápolis", "Pan de Azúcar"],
    ["Montevideo"],
    ["Paysandú", "Guichón"],
    ["Fray Bentos", "Young"],
    ["Rivera", "Tranqueras"],
    ["Rocha", "Chuy", "Lascano", "Castillos"],
    ["Salto"],
    ["San José de Mayo", "Ciudad del Plata", "Libertad"],
    ["Mercedes", "Dolores", "Cardona"],
    ["Tacuarembó", "Paso de los Toros"],
    ["Treinta y Tres"]
];

function quitarTel (id) {
    for (var i = id; i <= tel; i++)
        if (i !== tel)
            $("#tel" + i).find (".telInput").val ($("#tel" + (i + 1)).find (".telInput").val ());
    
    $("#tel" + tel).remove ();
    tel--;
    cambiarBotones ();
}

function agregarTel () {
    var nuevo = $("#tel" + tel).clone ();
    nuevo.prop ("hidden", false);
    nuevo.attr ("id", "tel" + (tel + 1));
    nuevo.find (".telInput").attr ("id", "telefono" + (tel + 1));
    nuevo.find (".telInput").attr ("placeholder", "Telefono " + (tel + 1));
    nuevo.find (".telInput").val ("");
    nuevo.find (".telButton").attr ("onclick", "quitarTel(" + (tel + 1) + ")");
    nuevo.insertAfter($("#tel" + tel));
    tel++;
    cambiarBotones ();
}

function cambiarBotones () {
    if (tel === 1) {
        $("#tel1").find (".telButton").prop ("disabled", true);
        return;
    }
    
    for (var i = 1; i <= tel; i++)
        $("#tel" + i).find (".telButton").prop ("disabled", false);
}

$(function () {
    var dia = document.getElementById("dia");
    for (var i = 1; i <= 31; i++) {
        var opt = document.createElement ("option");
        opt.innerHTML = opt.value = i;
        dia.appendChild(opt);
    }
    
    var mes = document.getElementById("mes");
    for (var i = 0; i < meses.length; i++) {
        var opt = document.createElement ("option");
        opt.innerHTML = opt.value = meses[i];
        mes.appendChild(opt);
    }
    
    var anio = document.getElementById("anio");
    for (var i = 1900; i <= new Date ().getFullYear (); i++) {
        var opt = document.createElement ("option");
        opt.innerHTML = opt.value = i;
        anio.appendChild(opt);
    }
    
    var departamento = document.getElementById("departamento");
    for (var i = 0; i < departamentos.length; i++) {
        var opt = document.createElement ("option");
        opt.innerHTML = opt.value = departamentos[i];
        departamento.appendChild(opt);
    }
    
    $("#departamento").change (function () {
        cargarCiudades ($("#departamento option:selected" ).text ());
    });
    
    agregarTel ();
});

$("#btnRegistrarUsuario").click (function () {
    var errCi = $("#ciError");
    var errNombre = $("#nombreError");
    var errApellido = $("#apellidoError");
    var errEmail = $("#emailError");
    var errFecha = $("#fechaError");
    
    errCi.prop ("hidden", true);
    errNombre.prop ("hidden", true);
    errApellido.prop ("hidden", true);
    errEmail.prop ("hidden", true);
    errFecha.prop ("hidden", true);
    
    var ci = $("#ci").val ().toString ().trim ();
    var digitoVer = $("#digitoVer").val ().toString ().trim ();
    var nombre = $("#nombre").val ().toString ().trim ();
    var apellido = $("#apellido").val ().toString ().trim ();
    var email = $("#email").val ().toString ().trim ();
    
    var dia = $("#dia").val ().toString ().trim ();
    var mes = $("#mes").val ().toString ().trim ();
    var anio = $("#anio").val ().toString ().trim ();
    
    var telefonos = [];
    
    var i;
    for (i = 0; i < tel; i++)
        telefonos.push ($("#telefono" + (i + 1)).val ().toString ().trim ());
    
    var errores = false;
    
    if (ci.length !== 7 || !cedulaCorrecta (ci, digitoVer)) {
        errCi.text ("Error: Cedula no valida.");
        errCi.prop ("hidden", false);
        errores = true;
    }
    
    if (!soloLetras (nombre)) {
        errNombre.text ("Error: Caracteres invalidos.");
        errNombre.prop ("hidden", false);
        errores = true;
    }
    
    if (!soloLetras (apellido)) {
        errApellido.text ("Error: Caracteres invalidos.");
        errApellido.prop ("hidden", false);
        errores = true;
    }
    
    if (!emailCorrecto (email)) {
        errEmail.text ("Error: Email no valido.");
        errEmail.prop ("hidden", false);
        errores = true;
    }
    
    if (!fechaCorrecta (dia, obtenerNumeroMes (mes), anio)) {
        errFecha.text ("Error: Fecha no valida.");
        errFecha.prop ("hidden", false);
        errores = true;
    }
    
    if (errores)
        return;
    
    alert ("Registrado!");
});

function cargarCiudades (departamento) {
    $("#ciudad").html ("");
    
    var ciudad = document.getElementById("ciudad");
    var def = document.createElement ("option");
    def.innerHTML = "Ciudad";
    def.value = "";
    ciudad.appendChild (def);
    
    if (departamento === "Departamento")
        return;
    
    var depPos = -1;
    for (var i = 0; i < departamentos.length; i++)
        if (departamento === departamentos[i]) {
            depPos = i;
            break;
        }
    
    for (var i = 0; i < ciudades[depPos].length; i++) {
        var opt = document.createElement ("option");
        opt.innerHTML = opt.value = ciudades[depPos][i];
        ciudad.appendChild(opt);
    }
}

function cedulaCorrecta (ci, digVer) {
    var dig = "2987634";
    var sum = 0;

    for (var i = 0 ; i < dig.length; i++)
        sum += (ci[i] * dig[i]) % 10;
    
    return 10 - sum % 10 === digVer * 1;
}

function obtenerNumeroMes (mes) {
    for (var i = 0; i < meses.length; i++)
        if (meses[i] === mes)
            return i + 1;
    
    return 0;
}

function emailCorrecto (email) {
    return filtroCorreo.test(email);
}

function fechaCorrecta (dia, mes, anio) {
    var d = new Date(anio * 1, mes * 1 - 1, dia);
    return d && (d.getMonth() + 1) === mes * 1;
}

function soloLetras (palabra) {
    for (var i = 0; i < caracteresNoPermitidos.length; i++)
        if (palabra.includes (caracteresNoPermitidos[i]))
            return false;
    return true;
}

function telefonoCorrecto (telefono) {
    return filtroTelefono.test(telefono);
}