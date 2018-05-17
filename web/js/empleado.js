$("#btnCambiar").click(function () {
    var passActual = $("#passActual").val();
    var passNueva = $("#passNueva").val();

    var error = false;

    if (passActual == "") {
        $("#actualParent").addClass("has-error");
        error = true;
    } else
        $("#actualParent").removeClass("has-error");

    if (passNueva == "") {
        $("#nuevaParent").addClass("has-error");
        error = true;
    } else
        $("#nuevaParent").removeClass("has-error");

    if (passActual == passNueva) {
        $("#actualParent").addClass("has-error");
        $("#nuevaParent").addClass("has-error");
        error = true;
    } else {
        $("#actualParent").removeClass("has-error");
        $("#nuevaParent").removeClass("has-error");
    }

    if (error)
        return;

    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SUsuario",
        data: {
            accion: "passCorrecta",
            pass: passActual
        },
        success: function (data) {
            if (data == "ERR") {
                $("#actualParent").addClass("has-error");
            } else if (data == "OK") {
                $("#actualParent").removeClass("has-error");

                pregunta("Esta seguro del cambio de contraseña?", "cambiarPass", "'" + passNueva + "'");
            }
        },
        error: function () {
            alert("Error: No se pudo contactar el servidor");
        }
    });
});

function cambiarPass(nueva) {
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SUsuario",
        data: {
            accion: "cambiarPass",
            pass: nueva
        },
        success: function (data) {
            if (data == "ERR") {
                $("#nuevaParent").addClass("has-error");
            } else if (data == "OK") {
                $("#nuevaParent").removeClass("has-error");
                mensaje("Contraseña cambiada");
            }
        },
        error: function () {
            alert("Error: No se pudo conectar con el servidor");
        }
    });
}
var turnoActual = "";
function cambiarEstadoTurno(idTurno, estado, idHA, numero) {
    if (turnoActual !== idTurno && turnoActual !== "") {
        alert("finalize el turno actual");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SEmpleado?accion=cambiarTurno",
        data: {
            idTurno: idTurno,
            estado: estado
        },
        success: function (data) {
            if (data === "ERR") {
                alert("error");
            } else if (data === "OK") {
                if (estado === "FINALIZADO") {
                    $("#btnFinalizado" + idTurno).remove();
                    $("#estado" + idTurno).html("FINALIZADO");
                    turnoActual = "";
                } else if (estado === "INICIADO") {
                    $("#btnIniciado" + idTurno).attr("onclick", "cambiarEstadoTurno(\"" + idTurno + "\",\"FINALIZADO\")");
                    $("#btnIniciado" + idTurno).attr("class", "btn btn-danger");
                    $("#btnIniciado" + idTurno).html("Finalizar <span class='glyphicon glyphicon-stop'></span>");
                    $("#btnIniciado" + idTurno).attr("id", "btnFinalizado" + idTurno);
                    $("#estado" + idTurno).html("INICIADO");
                    setClienteActual(idHA, numero);
                    turnoActual = idTurno;
                }
            }
        },
        error: function () {
            alert("Error: No se pudo conectar con el servidor");
        }
    });
}

function setClienteActual(idHA, numero) {
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SEmpleado?accion=cambiarClienteActual",
        data: {
            idHA: idHA,
            numero: numero
        },
        success: function (data) {
            if (data === "ERR") {
                alert("error");
            } else if (data === "OK") {
                $("#ca" + idHA).html(numero);
            }
        },
        error: function () {
            alert("Error: No se pudo conectar con el servidor");
        }
    });
}