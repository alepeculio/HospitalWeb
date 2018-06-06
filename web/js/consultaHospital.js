

//Calendario
var calendar;
YUI().use('calendar', 'datatype-date', 'cssbutton', function (Y) {

    calendar = new Y.Calendar({
        contentBox: "#mycalendar",
        width: '340px',
        showPrevMonth: false,
        showNextMonth: false,
        minimumDate: new Date(),
        date: new Date()
    }).render();
    // Get a reference to Y.DataType.Date
    var dtdate = Y.DataType.Date;
    // Listen to calendar's selectionChange event.
    calendar.on("selectionChange", function (ev) {
        var newDate = ev.newSelection[0];
        $.ajax({
            type: "POST",
            url: "/HospitalWeb/SHospital",
            data: {
                "obtenerHorarios": hospitalSeleccionado.title,
                "dia": dtdate.format(newDate),
                "medico": medico,
                "especialidad": espec,
                "horarioAtencion": comboJornada.value
            },
            success: function (data) {
                mensaje(data, "refresh");
            },
            error: function () {
                mensajeErr("Error: No se pudo conectar con el servidor.");
            }
        });
    });
});
/* FIN CALENDARIO */

function fecha() {
    var rules;
    var medico = $("#medicos").val().toString().trim();
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        async: false,
        data: {
            "horariosOcupadosVacunacion": hospital,
            "medico": medico,
        },
        success: function (data) {
            var r = data.split("&");
            rules = datearray2filter(r[0], r[1]);
            var jornadas = r[2].split("/");
            
            var data2 = jornadas.toString().split("-");
            
            for (var i in jornadas) {
                $("#jornadas").empty();
                $("#jornadas").append('<option>--</option>');
                $("#jornadas").append('<option value=' + data2[0] + '>Dia: ' + data2[1] +" Hora Inicio: "+ data2[2] +" Hora Final: "+ data2[3] + '</option>');

            }
        },
        error: function () {
            mensajeErr("Error: No se pudo conectar con el servidor.");
            $("#modalCalendario").modal("hide");
        }
    });
    var filterFunction = function (date, node, rules) {
        if (rules.indexOf("disabled" >= 0)) {

        }
    }
    ;
    calendar.set("customRenderer", {rules: rules, filterFunction: filterFunction});
    calendar.set("disabledDatesRule", "disabled");
    $('#Calendario').modal('show');
}
function Shijo() {
    $('#Shijo').hide();
}
function Shorario() {
    $('#Shorario').hide();
}
function verificar(td) {
    var vacuna = td.split("-");
    $.ajax({
        url: "/HospitalWeb/SHospital",
        type: "POST",
        dataType: 'json',
        data: {
            "edad": vacuna[2],
            "en": vacuna[1]
        },
        success: function (data) {
            if (data.length === 0) {
                $('#noEdad').modal('show');
            } else if (data === "no") {
                $('#noHijos').modal('show');
            } else {
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    var nombre = data[i].nombre;
                    var apellido = data[i].apellido;
                    $("#hijos").empty();
                    $("#hijos").append('<option>--</option>');
                    $("#hijos").append('<option value=' + id + '>' + nombre + ' ' + apellido + '</option>');
                }
                $.ajax({
                    url: "/HospitalWeb/SHospital",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "obtenerMedicos": hospital,
                    },
                    success: function (data) {
                        if (data.length === 0) {
                            alert("no medico")
                            //$('#noEdad').modal('show');
                        } else {

                            for (var i in data) {
                                $("#medicos").empty();
                                $("#medicos").append('<option>--</option>');
                                $("#medicos").append('<option value=' + data[i].id + '>' + data[i].nombre + ' ' + data[i].apellido + '</option>');
                            }
                            $('#correcto').modal('show');
                        }
                    },
                    error: function () {
                        console.log("Error");
                    }

                });
            }
        },
        error: function () {
            console.log("Error");
        }

    });
}
function horario(dia) {
    $('#Sdia').hide();
    $.ajax({
        url: "/HospitalWeb/SHospital",
        type: "POST",
        dataType: 'json',
        data: {
            "dia": dia,
            "hospital": hospital
        }
        ,
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var id = data[i][0].id;
                    var nombre = data[i][1].nombre;
                    var apellido = data[i][1].apellido;
                    var horainicio = data[i][0].horaInicio;
                    var horafin = data[i][0].horaFin;
                    $("#horarios").empty();
                    $("#horarios").append('<option>--</option>');
                    $("#horarios").append('<option value=' + id + '>Doctor: ' + nombre + ' ' + apellido + ' | Dispoible De: ' + horainicio + ' - Hasta: ' + horafin + '</option>');
                }
            } else {
                $("#horarios").append('<option value=no>No hay horarios dispoibles para este dia </option>');
            }
        },
        error: function () {
            console.log("Error");
        }

    });
}

function registrar() {
    var dia = $("#haDia").val().toString().trim();
    var hijo = $("#hijos").val().toString().trim();
    if (hijo === "") {
        $("#Shijo").show();
    }
    if (idHorario === "") {
        $("#Shorario").show();
    }
    if (idHorario === "no") {
        $("#Shorario").show();
    }
    if (dia === "") {
        $("#Sdia").show();
    }
    if (dia !== "" && idHorario !== "" && idHorario !== "no" && hijo !== "") {
        $.ajax({
            url: "/HospitalWeb/SHospital",
            type: "POST",
            data: {
                "idHorario": idHorario,
                "hijo": hijo,
                "idHospital": idhospital
            },
            success: function (data) {
                $('#correcto').modal('toggle');
                $("#trC").append('<td >' + data[0] + '</td>');
                $("#trC").append('<td >' + data[1] + '</td>');
                $("#trD").append('<td >' + data[2] + '</td>');
                $("#trD").append('<td >' + data[3] + '</td>');
                $("#trD").append('<td >' + data[4] + '</td>');
                $("#fin").modal();
            },
            error: function () {
                console.log("Error");
            }

        });
    }
}

/* FIN CALENDARIO */

function datearray2filter(dates, dias) {
    var ret = {};
    var partes = dates.split("#");
    var fechas = [];
    for (var j in partes) {

        var f = partes[j].split("-");
        fechas.push(new Date(f[0], f[1] - 1, f[2]));
    }

    for (var i in fechas) {
        var d = new Date(fechas[i]),
                y = d.getFullYear(),
                m = d.getMonth();
        if (!ret[y])
            ret[y] = {};
        if (!ret[y][m])
            ret[y][m] = {};
        ret[y][m][d.getDate()] = "disabled";
    }
    //editada
    var a = "all";
    if (!ret[a])
        ret[a] = {};
    if (!ret[a][a])
        ret[a][a] = {};
    if (!ret[a][a][a])
        ret[a][a][a] = {};
    ret[a][a][a][dias] = "disabled";
    //fin
    return ret;
}
;

