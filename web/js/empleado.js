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

                pregunta("Esta seguro del cambio de contrase&ntilde;a?", "cambiarPass", "'" + passNueva + "'");
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
                mensaje("Contrase&ntilde;a cambiada");
            }
        },
        error: function () {
            alert("Error: No se pudo conectar con el servidor");
        }
    });
}

var turnoActual = [];
function setTurnoActual(idHA, idTurno) {
    turnoActual[idHA] = idTurno;
}

function actualizarHA(idTurno, estado, idHA, numero) {
    if (turnoActual[idHA] !== idTurno && turnoActual[idHA] !== "") {
        mensajeErr("Finalize el turno actual");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SEmpleado?accion=actualizarHA",
        data: {
            idTurno: idTurno,
            estado: estado,
            idHA: idHA,
        },
        success: function (data) {
            if (data === "ERR") {
                mensajeErr("Ocurri&oacute; un error al actualizar el estado del turno");
                return;
            } else {
                if (estado === "FINALIZADO") {
                    $("#btnFinalizado" + idTurno).remove();
                    $("#estado" + idTurno).html("finalizado");
                    $("#ca" + idHA).html("-");
                    turnoActual[idHA] = "";
                } else if (estado === "INICIADO") {
                    $("#btnIniciado" + idTurno).attr("onclick", "actualizarHA(\"" + idTurno + "\",\"FINALIZADO\",\"" + idHA + "\",\"" + numero + "\")");
                    $("#btnIniciado" + idTurno).attr("class", "btn btn-danger");
                    $("#btnIniciado" + idTurno).html("Finalizar <span class='glyphicon glyphicon-stop'></span>");
                    $("#btnIniciado" + idTurno).attr("id", "btnFinalizado" + idTurno);
                    $("#estado" + idTurno).html("iniciado");
                    $("#ca" + idHA).html(numero);
                    turnoActual[idHA] = idTurno;
                }

                if (data === "firstTime") {
                    var finalizar = document.createElement("button");
                    finalizar.innerHTML = "Finalizar <span class='glyphicon glyphicon-stop'></span>";
                    finalizar.setAttribute("class", "btn btn-danger");
                    finalizar.setAttribute("onclick", "pregunta('&#191;Est&aacute; seguro que desea finalizar el horario de atenci&oacute;n&#63;,<br> todos sus turnos tambi&eacute;n finalizar&aacute;n.','finalizarHA','" + idHA + "')");
                    $("#estadoHA" + idHA).empty();
                    $("#estadoHA" + idHA).append(finalizar);
                    $("#ca" + idHA).html(numero);

                }

                if (data === "lastTime") {
                    $('[id^="estado"]', '#turnos' + idHA).text("finalizado");
                    $('[id ="btnEstado"]', '#turnos' + idHA).remove();
                    $('#estadoHA' + idHA).text("finalizado");
                    $("#ca" + idHA).html('-');
                    turnoActual[idHA] = "";
                }
            }
        },
        error: function () {
            alert("Error: No se pudo conectar con el servidor");
        }
    });
}

function finalizarHA(idHA) {
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SEmpleado?accion=finalizarHA",
        data: {
            idHA: idHA
        },
        success: function (data) {
            if (data === "ERR") {
                mensajeErr("Ocurri&oacute; un error al finalizar horario de atenci&oacute;n");
            } else if (data === "OK") {
                $('[id^="estado"]', '#turnos' + idHA).text("finalizado");
                $('[id ="btnEstado"]', '#turnos' + idHA).remove();
                $('#estadoHA' + idHA).text("finalizado");
                $("#ca" + idHA).html('-');
                turnoActual[idHA] = "";
            }
        },
        error: function () {
            alert("Error: No se pudo conectar con el servidor");
        }
    });
}



//mostrarDatosMedico(1);
