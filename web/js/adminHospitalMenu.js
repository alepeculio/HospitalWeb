//------------------------------------------------------------------------------------------------------------------------
//Relacionar con hijo

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

















