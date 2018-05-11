//------------------------------------------------------------------------------------------------------------------------
//Relacionar con hijo
function cargarClientes(idLista, nombreFila, nombreFunction) {
    $.ajax({
        url: "/HospitalWeb/SUsuario?accion=obtClientes",
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
                li.setAttribute("onclick", nombreFunction + "(" + data[i].id + ")");
                ul.appendChild(li);
                li.appendChild(a);
            }
        }
    });
}

cargarClientes("listCliP", "clientePFila", "seleccionarCliP");

function buscarCliP() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('buscarCliPInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listCliP");
    li = ul.getElementsByTagName('li');
    var restantes = 0;
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            restantes--;
        } else {
            li[i].style.display = "none";
            restantes++;
        }
    }

    if (restantes === li.length) {
        document.getElementById("listCliPNoEncontrado").style.display = "block";
    } else {
        document.getElementById("listCliPNoEncontrado").style.display = "none";
    }
}


var seleccionadoCliP = "";
function seleccionarCliP(idCliP) {
    var li = document.getElementById("clientePFila" + idCliP);
    li.style.background = "#204565c2";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "white";
    if (seleccionadoCliP !== "") {
        deseleccionarCliP();
    }
    seleccionadoCliP = idCliP;
    cargarHijos(seleccionadoCliP);
}

function deseleccionarCliP() {
    var li = document.getElementById("clientePFila" + seleccionadoCliP);
    li.style.background = "white";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "black";

    seleccionadoCliP = "";
}

function cargarHijos(idCliente) {
    $.ajax({
        url: "/HospitalWeb/SUsuario?accion=obtNoHijosCliente",
        type: "POST",
        dataType: 'json',
        data: {
            idCliente: idCliente
        },
        success: function (data) {
            var ul = document.getElementById("listCliH");
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
                li.setAttribute("id", "clienteHFila" + data[i].id);
                li.setAttribute("class", "list-group-item");
                li.setAttribute("onclick", "seleccionarCliH(" + data[i].id + ")");
                ul.appendChild(li);
                li.appendChild(a);
            }
        }
    });
}

var seleccionadoCliH = "";
function seleccionarCliH(idCliH) {
    var li = document.getElementById("clienteHFila" + idCliH);
    li.style.background = "#204565c2";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "white";
    if (seleccionadoCliH !== "" && seleccionadoCliH !== idCliH) {
        deseleccionarCliH();
    }
    seleccionadoCliH = idCliH;
}

function deseleccionarCliH() {
    var li = document.getElementById("clienteHFila" + seleccionadoCliH);
    li.style.background = "white";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "black";

    seleccionadoCliH = "";
}

function buscarCliH() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('buscarCliHInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listCliH");
    li = ul.getElementsByTagName('li');
    var restantes = 0;
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            restantes--;
        } else {
            li[i].style.display = "none";
            restantes++;
        }
    }

    if (restantes === li.length) {
        var ul = document.getElementById("listCliH");
        if (document.getElementById("listCliHNoEncontrado") === null) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.appendChild(document.createTextNode("No hay resultados para la busqueda"));
            li.setAttribute("id", "listCliHNoEncontrado");
            li.setAttribute("class", "list-group-item");
            ul.appendChild(li);
            li.appendChild(a);
        }
    } else {
        var li = document.getElementById("listCliHNoEncontrado");
        if (li !== null) {
            li.parentNode.removeChild(li);
        }
    }
}

$("#btnVincularCliente").click(function () {
    if (seleccionadoCliP === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó ningun cliente";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else if (seleccionadoCliH === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó un cliente como hijo";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else {
        $.ajax({
            url: "/HospitalWeb/SUsuario?accion=vincularHijoCliente",
            type: "POST",
            data: {
                idClienteP: seleccionadoCliP,
                idClienteH: seleccionadoCliH
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

                }
            }
        });
        deseleccionarCliP();
        deseleccionarCliH();
    }

});
//---------------------------------------------------------------------------------------------------------------------
//Eliminar cliente

cargarClientes("listCli", "clienteFila", "seleccionarCli");

function buscarCli() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('buscarCliInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listCli");
    li = ul.getElementsByTagName('li');
    var restantes = 0;
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            restantes--;
        } else {
            li[i].style.display = "none";
            restantes++;
        }
    }

    if (restantes === li.length) {
        var ul = document.getElementById("listCli");
        if (document.getElementById("listCliNoEncontrado") === null) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.appendChild(document.createTextNode("No hay resultados para la busqueda"));
            li.setAttribute("id", "listCliNoEncontrado");
            li.setAttribute("class", "list-group-item");
            ul.appendChild(li);
            li.appendChild(a);
        }
    } else {
        var li = document.getElementById("listCliNoEncontrado");
        if (li !== null) {
            li.parentNode.removeChild(li);
        }
    }
}

var seleccionadoCli = "";
function seleccionarCli(idCli) {
    var li = document.getElementById("clienteFila" + idCli);
    li.style.background = "#204565c2";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "white";
    if (seleccionadoCli !== "" && seleccionadoCli !== idCli) {
        deseleccionarCli();
    }
    seleccionadoCli = idCli;
}

function deseleccionarCli() {
    var li = document.getElementById("clienteFila" + seleccionadoCli);
    li.style.background = "white";
    var a = li.getElementsByTagName('a')[0];
    a.style.color = "black";

    seleccionadoCli = "";
}
$("#btnEliminarCliente").click(function () {
    if (seleccionadoCli === "") {
        var texto = document.getElementById("modalIUMensaje");
        texto.innerHTML = "No seleccionó ningun cliente";
        texto.style.color = "red";
        $("#modalIngresarUsuario").modal("show");
    } else {
        $.ajax({
            url: "/HospitalWeb/SUsuario?accion=eliminarCliente",
            type: "POST",
            data: {
                idCliente: seleccionadoCli
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

                }
            }
        });
        deseleccionarCli();
        cargarClientes("listCli", "clienteFila", "seleccionarCli");
    }

});







