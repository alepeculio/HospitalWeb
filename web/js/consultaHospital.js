

//Calendario
var calendar;
var idMedico;
var dia;
var idHijo;

function hr(id) {
    $('#spanHorario').css('visibility', 'hidden');
    horario = id;
}


//Calendario 
var DiaFinal = "";
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
        $('#SelectHora').removeAttr('hidden');
        var newDate = ev.newSelection[0];
        var dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var d = newDate;
        DiaFinal = dias[d.getDay()];
        dia = dtdate.format(newDate);
        $("#jornadas").empty();
        for (var i in jornadas) {
            var data2 = jornadas[i].toString().split("-");
            if (data2[1] == DiaFinal) {
                console.log(data2);
                $("#jornadas").append('<button type="button" class="list-group-item list-group-item-action hr" onclick="hr(' + data2[0] + ')">Dia: ' + data2[1] + " Hora Inicio: " + data2[2] + " Hora Final: " + data2[3] + '</button>');
            }
        }
    });
});
/* FIN CALENDARIO */

$("#hijos").change(function () {
    $('#spanHijo').css('visibility', 'hidden');
});
$("#medicos").change(function () {
    $('#spanMedico').css('visibility', 'hidden');
});
//Dias Calendario
var jornadas = "";
function fecha() {
    var rules;
    idHijo = $("#hijos").val().toString().trim();
    idMedico = $("#medicos").val().toString().trim();

    if (idMedico == "--" && idHijo == "--") {
        $('#spanMedico').css('visibility', 'visible');
        $('#spanHijo').css('visibility', 'visible');
        return;
    }
    if (idMedico == "--") {
        $('#spanMedico').css('visibility', 'visible');
        return;
    }

    if (idHijo == "--") {
        $('#spanHijo').css('visibility', 'visible');
        return;
    }
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        async: false,
        data: {
            "horariosOcupadosVacunacion": hospital,
            "medico": idMedico,
        },
        success: function (data) {
            console.log(data);
            var r = data.split("&");
            rules = datearray2filter(r[0], r[1]);
            jornadas = r[2].split("/");

        },
        error: function () {
            mensajeErr("Error: No se pudo    conectar con el servidor.");
            $("#Calendario").modal("hide");
        }
    });
    var filterFunction = function (date, node, rules) {
        if (rules.indexOf("disabled" >= 0)) {

        }
    }
    ;
    calendar.set("customRenderer", {rules: rules, filterFunction: filterFunction});
    calendar.set("disabledDatesRule", "disabled");

    $('#correcto').modal('hide');
    $('#Calendario').modal('show');
    
}


//Verificar Edad
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
                $("#hijos").empty();
                $("#hijos").append('<option>--</option>');
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    var nombre = data[i].nombre;
                    var apellido = data[i].apellido;
                    $("#hijos").append('<option value=' + id + '>' + nombre + ' ' + apellido + '</option>');
                }
                $.ajax({
                    url: "/HospitalWeb/SHospital",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "obtenerMedicosconHRV": hospital,
                    },
                    success: function (data) {
                        if (data.length === 0) {
                            //agregar modal no medico
                            alert("no medico");

                        } else {
                            $("#medicos").empty();
                            $("#medicos").append('<option>--</option>');
                            for (var i in data) {
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

//Reservar turno de vacunacion 
function Reservar() {

    if (horario == "") {
        $('#spanHorario').css('visibility', 'visible');
        return;
    }

    $.ajax({
        url: "/HospitalWeb/SHospital",
        type: "POST",
        data: {
            "Reservar": "Yes",
            "idHorario": horario,
            "idHijo": idHijo,
            "idHospital": idhospital,
            "dia": dia
        },
        success: function (data) {

            
            if (data[0] == "no") {
                dia = "";
                $("#finDos").modal('show');
            } else {
                idMedico = "";
                dia = "";
                idHijo = "";
                $("#trC").empty();
                $("#trC").append('<td >' + data[0] + '</td>');
                $("#trC").append('<td >' + data[1] + '</td>');
                $("#trD").append('<td >' + data[2] + '</td>');
                $("#trD").append('<td >' + data[3] + '</td>');
                $("#trD").append('<td >' + data[4] + '</td>');
                $("#fin").modal();
            }

        },
        error: function () {
            console.log("Error");
        }

    });

}



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


