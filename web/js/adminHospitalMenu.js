//Registrar cliente y medico

var tel = 0;
var esp = 0;
var telMed = 0;
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
agregarTel();
agregarTelMed();
//--------------------------------------------------------------------------------------------------------------------------------------------------
//Telefonos de ingresar usaurio

function agregarTel() {
    var nuevo = $("#tel" + tel).clone();
    nuevo.prop("hidden", false);
    nuevo.attr("id", "tel" + (tel + 1));
    nuevo.find(".telInput").attr("id", "telefono" + (tel + 1));
    nuevo.find(".telInput").attr("placeholder", "Teléfono " + (tel + 1));
    nuevo.find(".telInput").val("");
    nuevo.find(".telButton").attr("onclick", "quitarTel(" + (tel + 1) + ")");
    nuevo.insertAfter($("#tel" + tel));
    tel++;
    cambiarBotones();
}

function quitarTel(id) {
    for (var i = id; i <= tel; i++)
        if (i !== tel)
            $("#tel" + i).find(".telInput").val($("#tel" + (i + 1)).find(".telInput").val());
    $("#tel" + tel).remove();
    tel--;
    cambiarBotones();
}

function cambiarBotones() {
    if (tel === 1) {
        $("#tel1").find(".telButton").prop("disabled", true);
        return;
    }

    for (var i = 1; i <= tel; i++)
        $("#tel" + i).find(".telButton").prop("disabled", false);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
//Telefonos de ingresar medico

function agregarTelMed() {
    var nuevo = $("#telMed" + telMed).clone();
    nuevo.prop("hidden", false);
    nuevo.attr("id", "telMed" + (telMed + 1));
    nuevo.find(".telMedInput").attr("id", "telefonoMed" + (telMed + 1));
    nuevo.find(".telMedInput").attr("placeholder", "Teléfono " + (telMed + 1));
    nuevo.find(".telMedInput").val("");
    nuevo.find(".telMedButton").attr("onclick", "quitarTelMed(" + (telMed + 1) + ")");
    nuevo.insertAfter($("#telMed" + telMed));
    telMed++;
    cambiarBotonesMed();
}

function quitarTelMed(id) {
    for (var i = id; i <= telMed; i++)
        if (i !== telMed)
            $("#telMed" + i).find(".telMedInput").val($("#telMed" + (i + 1)).find(".telMedInput").val());
    $("#telMed" + telMed).remove();
    telMed--;
    cambiarBotonesMed();
}

function cambiarBotonesMed() {
    if (telMed === 1) {
        $("#telMed1").find(".telMedButton").prop("disabled", true);
        return;
    }

    for (var i = 1; i <= telMed; i++)
        $("#telMed" + i).find(".telMedButton").prop("disabled", false);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
//Especialidades en ingresar medico

function agregarEspecialidad() {
    var nuevo = $("#esp" + esp).clone();
    nuevo.prop("hidden", false);
    nuevo.attr("id", "esp" + (esp + 1));
    nuevo.find(".especialidad").attr("id", "especialidad" + (esp + 1));
    nuevo.find(".especialidad").attr("placeholder", "Especialidad " + (esp + 1));
    nuevo.find(".especialidad").val("");
    nuevo.find(".especialidadButton").attr("onclick", "quitarEspecialidad(" + (esp + 1) + ")");
    nuevo.insertAfter($("#esp" + esp));
    esp++;
    cambiarBotonesEsp();
}

function quitarEspecialidad(id) {
    for (var i = id; i <= esp; i++)
        if (i !== esp)
            $("#esp" + i).find(".especialidad").val($("#esp" + (i + 1)).find(".especialidad").val());
    $("#esp" + esp).remove();
    esp--;
    cambiarBotonesEsp();
}

function cambiarBotonesEsp() {
    if (esp === 1) {
        $("#esp1").find(".especialidadButton").prop("disabled", true);
        return;
    }

    for (var i = 1; i <= esp; i++)
        $("#esp" + i).find(".especialidadButton").prop("disabled", false);
}


//--------------------------------------------------------------------------------------------------------------------------------------------------

$(function () {
    var dia = document.getElementById("dia");
    var diaMed = document.getElementById("diaMed");
    for (var i = 1; i <= 31; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = opt.value = i;
        dia.appendChild(opt);
        var optMed = document.createElement("option");
        optMed.innerHTML = opt.value = i;
        diaMed.appendChild(optMed);
    }

    var mes = document.getElementById("mes");
    var mesMed = document.getElementById("mesMed");
    for (var i = 0; i < meses.length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = opt.value = meses[i];
        var optMed = document.createElement("option");
        optMed.innerHTML = opt.value = meses[i];
        mes.appendChild(opt);
        mesMed.appendChild(optMed);
    }

    var anio = document.getElementById("anio");
    var anioMed = document.getElementById("anioMed");
    for (var i = 1900; i <= new Date().getFullYear(); i++) {
        var opt = document.createElement("option");
        opt.innerHTML = opt.value = i;
        anio.appendChild(opt);
        var optMed = document.createElement("option");
        optMed.innerHTML = opt.value = i;
        anioMed.appendChild(optMed);
    }

    var departamento = document.getElementById("departamento");
    var departamentoMed = document.getElementById("departamentoMed");
    for (var i = 0; i < departamentos.length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = opt.value = departamentos[i];
        departamento.appendChild(opt);

        var optMed = document.createElement("option");
        optMed.innerHTML = opt.value = departamentos[i];
        departamentoMed.appendChild(optMed);
    }

    $("#departamento").change(function () {
        $("#ciudad").html("");
        var ciudad = document.getElementById("ciudad");
        cargarCiudades($("#departamento option:selected").text(), ciudad);
    });

    $("#departamentoMed").change(function () {
        $("#ciudadMed").html("");
        var ciudadMed = document.getElementById("ciudadMed");
        cargarCiudades($("#departamentoMed option:selected").text(), ciudadMed);
    });
});
var correoE = false;
function correoExiste(correo) {

    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SUsuario?accion=verificarCorreo",
        data: {
            correo: correo
        },
        success: function (data) {
            var existe;
            if (data === "OK") {
                existe = true;
            } else {
                existe = false;
            }
            setCorreoExiste(existe);
        },
        error: function () {
        }
    });
}
function setCorreoExiste(existe) {
    correoE = existe;
}

var cedulaE = false;
function cedulaExiste(cedula) {
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SUsuario?accion=verificarCedula",
        data: {
            cedula: cedula
        },
        success: function (data) {
            var existe;
            if (data === "OK") {
                existe = true;
            } else {
                existe = false;
            }
            setCedulaExiste(existe);
        },
        error: function () {
        }
    });
}
function setCedulaExiste(existe) {
    cedulaE = existe;
}

$("#email").focusout(function(){
    correoExiste($("#email").val().toString().trim());
});

$("#digitoVer").focusout(function(){
    cedulaExiste($("#ci").val().toString().trim() + $("#digitoVer").val().toString().trim());
});
        

$("#btnRegistrarUsuario").click(function () {
    var errCi = $("#ciError");
    var errNombre = $("#nombreError");
    var errApellido = $("#apellidoError");
    var errEmail = $("#emailError");
    var errFecha = $("#fechaError");
    errCi.prop("hidden", true);
    errNombre.prop("hidden", true);
    errApellido.prop("hidden", true);
    errEmail.prop("hidden", true);
    errFecha.prop("hidden", true);
    var ci = $("#ci").val().toString().trim();
    var digitoVer = $("#digitoVer").val().toString().trim();
    var nombre = $("#nombre").val().toString().trim();
    var apellido = $("#apellido").val().toString().trim();
    var email = $("#email").val().toString().trim();
    var dia = $("#dia").val().toString().trim();
    var mes = $("#mes").val().toString().trim();
    var anio = $("#anio").val().toString().trim();
    var departamento = $("#departamento").val().toString().trim();
    var ciudad = $("#ciudad").val().toString().trim();
    var calle = $("#calle").val().toString().trim();
    var numero = $("#numero").val().toString().trim();
    var apartamento = $("#apartamento").val().toString().trim();
    var telefonos = "";
    var i;
    for (i = 1; i < tel; i++)
        telefonos = telefonos + "|" + ($("#telefono" + (i + 1)).val().toString().trim());
    var errores = false;
    if (ci.length !== 7 || !cedulaCorrecta(ci, digitoVer)) {
        errCi.text("Error: Cedula no valida.");
        errCi.prop("hidden", false);
        errores = true;
    } else {
        cedulaExiste(ci + digitoVer);
        if (cedulaE === true) {
            errCi.text("Error: Cedula ya existe.");
            errCi.prop("hidden", false);
            errores = true;
        }
    }

    if (!soloLetras(nombre)) {
        errNombre.text("Error: Caracteres invalidos.");
        errNombre.prop("hidden", false);
        errores = true;
    }

    if (!soloLetras(apellido)) {
        errApellido.text("Error: Caracteres invalidos.");
        errApellido.prop("hidden", false);
        errores = true;
    }

    if (!emailCorrecto(email)) {
        errEmail.text("Error: Email no valido.");
        errEmail.prop("hidden", false);
        errores = true;
    } else {
        //correoExiste(email);
        if (correoE === true) {
            errEmail.text("Error: Email ya existe.");
            errEmail.prop("hidden", false);
            errores = true;
        }
    }

    if (!fechaCorrecta(dia, obtenerNumeroMes(mes), anio)) {
        errFecha.text("Error: Fecha no valida.");
        errFecha.prop("hidden", false);
        errores = true;
    }

    if (errores) {
        return;
    } else {
        $.ajax({
            type: "POST",
            url: "/HospitalWeb/SUsuario?accion=altaCliente",
            data: {
                nombre: nombre,
                apellido: apellido,
                ci: ci,
                digitoVer: digitoVer,
                email: email,
                dia: dia,
                mes: obtenerNumeroMes(mes),
                anio: anio,
                departamento: departamento,
                ciudad: ciudad,
                calle: calle,
                numero: numero,
                apartamento: apartamento,
                telefonos: telefonos
            },
            success: function (data) {
                var texto = document.getElementById("modalIUMensaje");

                if (data === "ERR") {
                    texto.innerHTML = "El cliente no se pudo ingresar al sistema";
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                } else if (data === "OK") {
                    texto.innerHTML = "El cliente ha sido ingresado correctamente";
                    texto.style.color = "green";
                    $("#modalIngresarUsuario").modal("show");
                    $("#formIC")[0].reset();
                    setNoCargado("CliP");
                    setNoCargado("Cli");
                } else {
                    texto.innerHTML = data;
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                }
            },
            error: function () {
            }
        });
    }
});

$("#btnRegistrarMedico").click(function () {
    var errCi = $("#ciMedError");
    var errNombre = $("#nombreMedError");
    var errApellido = $("#apellidoMedError");
    var errEmail = $("#emailMedError");
    var errFecha = $("#fechaMedError");
    errCi.prop("hidden", true);
    errNombre.prop("hidden", true);
    errApellido.prop("hidden", true);
    errEmail.prop("hidden", true);
    errFecha.prop("hidden", true);
    var ci = $("#ciMed").val().toString().trim();
    var digitoVer = $("#digitoVerMed").val().toString().trim();
    var nombre = $("#nombreMed").val().toString().trim();
    var apellido = $("#apellidoMed").val().toString().trim();
    var email = $("#emailMed").val().toString().trim();
    var dia = $("#diaMed").val().toString().trim();
    var mes = $("#mesMed").val().toString().trim();
    var anio = $("#anioMed").val().toString().trim();
    var departamento = $("#departamentoMed").val().toString().trim();
    var ciudad = $("#ciudadMed").val().toString().trim();
    var calle = $("#calleMed").val().toString().trim();
    var numero = $("#numeroMed").val().toString().trim();
    var apartamento = $("#apartamentoMed").val().toString().trim();
    var telefonos = "";
    var i;
    for (i = 1; i < telMed; i++)
        telefonos = telefonos + "|" + ($("#telefonoMed" + (i + 1)).val().toString().trim());

    var especialidades = "";
    var j;
    for (j = 1; j < esp; j++)
        especialidades = especialidades + "|" + ($("#especialidad" + (j + 1)).val().toString().trim());
    var errores = false;
    if (ci.length !== 7 || !cedulaCorrecta(ci, digitoVer)) {
        errCi.text("Error: Cedula no valida.");
        errCi.prop("hidden", false);
        errores = true;
    }

    if (!soloLetras(nombre)) {
        errNombre.text("Error: Caracteres invalidos.");
        errNombre.prop("hidden", false);
        errores = true;
    }

    if (!soloLetras(apellido)) {
        errApellido.text("Error: Caracteres invalidos.");
        errApellido.prop("hidden", false);
        errores = true;
    }

    if (!emailCorrecto(email)) {
        errEmail.text("Error: Email no valido.");
        errEmail.prop("hidden", false);
        errores = true;
    }

    if (!fechaCorrecta(dia, obtenerNumeroMes(mes), anio)) {
        errFecha.text("Error: Fecha no valida.");
        errFecha.prop("hidden", false);
        errores = true;
    }

    if (errores) {
        return;
    } else {
        $.ajax({
            type: "POST",
            url: "/HospitalWeb/SUsuario?accion=altaMedico",
            data: {
                nombre: nombre,
                apellido: apellido,
                ci: ci,
                digitoVer: digitoVer,
                email: email,
                dia: dia,
                mes: obtenerNumeroMes(mes),
                anio: anio,
                departamento: departamento,
                ciudad: ciudad,
                calle: calle,
                numero: numero,
                apartamento: apartamento,
                telefonos: telefonos,
                especialidades: especialidades
            },
            success: function (data) {
                var texto = document.getElementById("modalIUMensaje");

                if (data === "ERR") {
                    texto.innerHTML = "El medico no se pudo ingresar al sistema";
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                } else if (data === "OK") {
                    texto.innerHTML = "El médico ha sido ingresado correctamente";
                    texto.style.color = "green";
                    $("#modalIngresarUsuario").modal("show");
                    $("#formIC2")[0].reset();
                    setNoCargado("CliP");
                    setNoCargado("MedE");
                    setNoCargado("MedHA");
                    setNoCargado("MedHAE")
                } else {
                    texto.innerHTML = data;
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                }
            },
            error: function () {
            }
        });
    }
});

function cargarCiudades(departamento, ciudad) {
    var def = document.createElement("option");
    def.innerHTML = "Ciudad";
    def.value = "";
    ciudad.appendChild(def);
    if (departamento === "Departamento")
        return;
    var depPos = -1;
    for (var i = 0; i < departamentos.length; i++)
        if (departamento === departamentos[i]) {
            depPos = i;
            break;
        }

    for (var i = 0; i < ciudades[depPos].length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = opt.value = ciudades[depPos][i];
        ciudad.appendChild(opt);
    }
}

function cedulaCorrecta(ci, digVer) {
    var dig = "2987634";
    var sum = 0;
    for (var i = 0; i < dig.length; i++)
        sum += (ci[i] * dig[i]) % 10;
    return 10 - sum % 10 === digVer * 1;
}

function obtenerNumeroMes(mes) {
    for (var i = 0; i < meses.length; i++)
        if (meses[i] === mes)
            return i + 1;
    return 0;
}

function emailCorrecto(email) {
    return filtroCorreo.test(email);
}

function fechaCorrecta(dia, mes, anio) {
    var d = new Date(anio * 1, mes * 1 - 1, dia);
    return d && (d.getMonth() + 1) === mes * 1;
}

function soloLetras(palabra) {
    for (var i = 0; i < caracteresNoPermitidos.length; i++)
        if (palabra.includes(caracteresNoPermitidos[i]))
            return false;
    return true;
}

function telefonoCorrecto(telefono) {
    return filtroTelefono.test(telefono);
}

////------------------------------------------------------------------------------------------------------------------------
//Relacionar con hijo

var cargado = ["Cli", "CliP", "MedE", "MedHA", "MedHAE"];
cargado["Cli"] = false;
cargado["CliP"] = false;
cargado["MedE"] = false;
cargado["MedHA"] = false;
cargado["MedHAE"] = false;

function cargarClientes(idLista, nombreFila, tipo, conEmpleados) {
    if (cargado[tipo] === true) {
        return;
    }
    $.ajax({
        url: "/HospitalWeb/SUsuario?accion=obtClientes",
        type: "POST",
        dataType: 'json',
        data: {
            conEmpleados: conEmpleados
        },
        success: function (data) {
            var ul = document.getElementById(idLista);
            $(ul).empty();
            if (data.length === 0) {
                var li1 = document.createElement("li");
                var a1 = document.createElement("a");
                a1.appendChild(document.createTextNode("No hay clientes"));
                li1.setAttribute("class", "list-group-item");
                ul.appendChild(li1);
                li1.appendChild(a1);
            }
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.appendChild(document.createTextNode(data[i].nombre + " " + data[i].apellido));
                li.setAttribute("id", nombreFila + data[i].id);
                li.setAttribute("class", "list-group-item");
                li.setAttribute("onclick", "seleccionar" + "('" + nombreFila + "','" + data[i].id + "','" + tipo + "')");
                ul.appendChild(li);
                li.appendChild(a);
            }
            setCargado(tipo);
        }
    });
}

function setCargado(tipo) {
    cargado[tipo] = true;
}
function setNoCargado(tipo) {
    cargado[tipo] = false;
}

function buscar(inputid, listaid) {

    var input, filter, ul, li, a, i, contador;
    input = document.getElementById(inputid);
    filter = input.value.toUpperCase();
    ul = document.getElementById(listaid);
    li = ul.getElementsByTagName('li');
    contador = li.length;

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            if (parseInt(contador) < li.length)
                contador = parseInt(contador) + 1;
        } else {
            li[i].style.display = "none";
            contador = parseInt(contador) - 1;

        }
    }

    var liNoEncontrado = document.getElementById(listaid + "NoEncontrado");
    if (contador === 0) {
        if (liNoEncontrado === null) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.appendChild(document.createTextNode("No hay resultados para la busqueda"));
            li.setAttribute("id", listaid + "NoEncontrado");
            li.setAttribute("class", "list-group-item");
            li.style.display = "block";
            ul.appendChild(li);
            li.appendChild(a);
        } else {
            liNoEncontrado.style.display = "block";
        }
    } else {
        if (liNoEncontrado !== null) {
            liNoEncontrado.parentNode.removeChild(liNoEncontrado);
        }
    }
}

var seleccionado = ["Cli", "CliP", "CliH", "MedE", "MedHA", "MedHAE"];
seleccionado["Cli"] = "";
seleccionado["CliP"] = "";
seleccionado["CliH"] = "";
seleccionado["MedE"] = "";
seleccionado["MedHA"] = "";
seleccionado["MedHAE"] = "";

function seleccionar(nombreFila, id, tipo) {
    var li = document.getElementById(nombreFila + id);
    li.style.background = "#204565c2";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "white";
    if (seleccionado[tipo] !== "") {
        deseleccionar(nombreFila, tipo);
    }
    seleccionado[tipo] = id;
    if (tipo === "CliP") {
        cargarHijos(seleccionado[tipo], "listCliH", "clienteHFila", "CliH");
    }

}
function deseleccionar(nombreFila, tipo) {
    var li = document.getElementById(nombreFila + seleccionado[tipo]);
    li.style.background = "white";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "black";
    seleccionado[tipo] = "";
}

function cargarHijos(idCliente, idLista, nombreFila, tipo) {
    $.ajax({
        url: "/HospitalWeb/SUsuario?accion=obtNoHijosCliente",
        type: "POST",
        dataType: 'json',
        data: {
            idCliente: idCliente
        },
        success: function (data) {
            var ul = document.getElementById(idLista);
            $(ul).empty();
            if (data.length === 0) {
                var li1 = document.createElement("li");
                var a1 = document.createElement("a");
                a1.appendChild(document.createTextNode("No hay clientes relacionables con el seleccionado"));
                li1.setAttribute("class", "list-group-item");
                ul.appendChild(li1);
                li1.appendChild(a1);
            }
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.appendChild(document.createTextNode(data[i].nombre + " " + data[i].apellido));
                li.setAttribute("id", nombreFila + data[i].id);
                li.setAttribute("class", "list-group-item");
                li.setAttribute("onclick", "seleccionar" + "('" + nombreFila + "','" + data[i].id + "','" + tipo + "')");
                ul.appendChild(li);
                li.appendChild(a);
            }
        }
    });
}


$("#btnVincularCliente").click(function () {
    if (seleccionado["CliP"] === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó ningun cliente";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else if (seleccionado["CliH"] === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó un cliente como hijo";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else {
        $.ajax({
            url: "/HospitalWeb/SUsuario?accion=vincularHijoCliente",
            type: "POST",
            data: {
                idClienteP: seleccionado["CliP"],
                idClienteH: seleccionado["CliH"]
            },
            success: function (data) {
                var texto = document.getElementById("modalIUMensaje");
                if (data === "ERR") {
                    texto.innerHTML = "No se pudo relacionar los clientes seleccionados";
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                } else {
                    texto.innerHTML = "Clientes relacionados correctamente";
                    texto.style.color = "green";
                    $("#modalIngresarUsuario").modal("show");
                    deseleccionar("clientePFila", "CliP");
                    deseleccionar("clienteHFila", "CliH");
                }
            }
        });

    }

});
//---------------------------------------------------------------------------------------------------------------------
//Eliminar cliente

$("#btnEliminarCliente").click(function () {
    if (seleccionado["Cli"] === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó ningun cliente";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else {
        $.ajax({
            url: "/HospitalWeb/SUsuario?accion=eliminarCliente",
            type: "POST",
            data: {
                idCliente: seleccionado["Cli"]
            },
            success: function (data) {
                var texto = document.getElementById("modalIUMensaje");
                if (data === "ERR") {
                    texto.innerHTML = "No se pudo eliminar el cliente seleccionado";
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                } else {
                    texto.innerHTML = "Cliente eliminado correctamente";
                    texto.style.color = "green";
                    $("#modalIngresarUsuario").modal("show");
                    deseleccionar("clienteFila", "Cli");
                    setNoCargado("Cli");
                    cargarClientes("listCli", "clienteFila", "Cli", "no");
                    setNoCargado("CliP");
                }
            }
        });
    }
});
//---------------------------------------------------------------------------------------------------------------------------
//Eliminar medico


function cargarMedicos(idLista, nombreFila, tipo) {
    if (cargado[tipo] === true) {
        return;
    }
    $.ajax({
        url: "/HospitalWeb/SUsuario?accion=obtEmpleados",
        type: "POST",
        dataType: 'json',
        data: {
        },
        success: function (data) {
            var ul = document.getElementById(idLista);
            $(ul).empty();
            if (data.length === 0) {
                var li1 = document.createElement("li");
                var a1 = document.createElement("a");
                a1.appendChild(document.createTextNode("No hay médicos"));
                li1.setAttribute("class", "list-group-item");
                ul.appendChild(li1);
                li1.appendChild(a1);
            }
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.appendChild(document.createTextNode(data[i].nombre + " " + data[i].apellido));
                li.setAttribute("id", nombreFila + data[i].id);
                li.setAttribute("class", "list-group-item");
                li.setAttribute("onclick", "seleccionar" + "('" + nombreFila + "','" + data[i].id + "','" + tipo + "')");
                ul.appendChild(li);
                li.appendChild(a);
            }
            setCargado(tipo);
        }
    });
}





$("#btnEliminarMedico").click(function () {
    if (seleccionado["MedE"] === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó ningun medico";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else {
        $.ajax({
            url: "/HospitalWeb/SUsuario?accion=eliminarEmpleado",
            type: "POST",
            data: {
                idEmpleado: seleccionado["MedE"]
            },
            success: function (data) {
                var texto = document.getElementById("modalIUMensaje");
                if (data === "ERR") {
                    texto.innerHTML = "No se pudo eliminar el médico seleccionado";
                    texto.style.color = "red";
                    $("#modalIngresarUsuario").modal("show");
                } else {
                    texto.innerHTML = "Médico eliminado correctamente";
                    texto.style.color = "green";
                    $("#modalIngresarUsuario").modal("show");
                    deseleccionar("medicoEFila", "MedE");
                    setNoCargado("MedE");
                    cargarMedicos("listMedE", "medicoEFila", "MedE");
                    setNoCargado("CliP");
                    setNoCargado("MedHA");
                    setNoCargado("MedHAE");

                }
            }
        });
    }
});