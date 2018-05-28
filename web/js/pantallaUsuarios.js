var mapa;
var posInicial;
var marcadores = [];
var hospitales = [];
var servicio;
var direccion;
function agregarHospital(nombre, lat, lng) {
    hospitales.push([nombre, lat, lng]);
}

function initMapa() {
    posInicial = new google.maps.LatLng(-32.3209812, -58.0799678);
    var opciones = {
        center: posInicial,
        zoom: 14,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap']
        },
        disableDefaultUI: true
        ,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "weight": 5
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    };
    mapa = new google.maps.Map(document.getElementById("mapa"), opciones);
    mapa.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById("leyenda"));
    mapa.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById("busqueda"));
    servicio = new google.maps.DirectionsService;
    direccion = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        map: mapa
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            posInicial = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            new google.maps.Marker({
                position: posInicial,
                title: "Posicion Actual",
                icon: {
                    url: "img/persona.png",
                    scaledSize: new google.maps.Size(29, 45)
                },
                map: mapa
            });
        }, function () {
            posInicial = new google.maps.LatLng(-32.3209812, -58.0799678);
        });
    } else
        posInicial = new google.maps.LatLng(-32.3209812, -58.0799678);
    for (var i = 0; i < hospitales.length; i++) {
        var marcador = new google.maps.Marker({
            position: new google.maps.LatLng(hospitales[i][1], hospitales[i][2]),
            title: hospitales[i][0],
            icon: {
                url: "img/icono_h.png",
                scaledSize: new google.maps.Size(29, 35)
            },
            map: mapa
        });
        marcador.addListener("click", function () {
            clickHospital(this);
        });
        marcadores.push(marcador);
    }
}

function clickHospital(hospital) {
    hospitalSeleccionado = hospital;
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SUsuario",
        data: {
            accion: "estaSuscripto",
            nombreHosp: hospitalSeleccionado.title
        },
        success: function (data) {
            $("#estadoDeSusc").html(data[0]);
            if (data[0] === "NO") {
                $("#btnSuscripcion").show();
                $("#divEstadoSus").hide();
            } else {
                if (data[0] === "Rechazada" || data[0] === "Eliminada") {
                    $("#btnSuscripcion").show();
                    $("#divEstadoSus").show();
                } else if ("Pendiente") {
                    $("#btnSuscripcion").hide();
                    $("#divEstadoSus").show();
                } else if (data[0].includes("Activa")) {
                    $("#btnSuscripcion").hide();
                    $("#divEstadoSus").show();
                } else if (data[0].includes("Vencida")) {
                    $("#btnSuscripcion").show();
                    $("#divEstadoSus").show();
                }
            }

            if (data[1] === "Privado" && data[0].includes("Activa")) {
                $("#btnReservarTurno").show();
            } else if (data[1] === "Privado" && !data[0].includes("Activa")) {
                $("#btnReservarTurno").hide();
            }
            if (data[1] === "Publico") {
                $("#btnReservarTurno").show();
                $("#btnSuscripcion").hide();
                $("#divEstadoSus").hide();
            }

            $("#modalOpciones").modal("show");
        },
        error: function () {
            mensajeErr("Error: No se pudo cargar la informacion del hospital");
        }
    });
}

$("#btnBuscar").click(function () {
    for (var i = 0; i < marcadores.length; i++)
        if (marcadores[i].title === $("#txtBuscar").val()) {
            centrarHospital(marcadores[i]);
            return;
        }

    mensajeErr("No hay ningun hospital con ese nombre");
});
function centrarHospital(hospital) {
    mapa.setCenter(hospital.position);
    mapa.setZoom(16);
}

$("#btnVerInfo").click(function () {
    window.location = "/HospitalWeb/SHospital?verHospital=" + hospitalSeleccionado.title;
});
$("#btnSuscripcion").click(function () {
    preguntaMensaje("Desea solicitar suscripcion en " + hospitalSeleccionado.title + "?", "Cantidad de meses", "solicitarSuscripcion");
});
function solicitarSuscripcion(cant) {
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SUsuario",
        data: {
            accion: "solicitarSus",
            nomHosp: hospitalSeleccionado.title,
            cant: $("#" + cant).val()
        },
        success: function (data) {
            if (data !== "OK") {
                mensajeErr(data);
                return;
            }
            $("#modalOpciones").modal("hide");
            mensaje("La solicitud de suscripcion fue enviada")
        },
        error: function () {
            mensajeErr("Error: No se pudo solicitar la suscripcion.");
        }
    });
}

$("#btnMostrarRuta").click(function () {
    var selectedMode = document.getElementById("mode").value;
    var peticion = {
        origin: posInicial,
        destination: hospitalSeleccionado.position,
        travelMode: google.maps.TravelMode[selectedMode]
    };
    servicio.route(peticion, function (resultado, estado) {
        if (estado == "OK")
            direccion.setDirections(resultado);
    });
});

var medicos;

$("#btnReservarTurno").click(function () {
    $("#modalOpciones").modal("hide");
    //combo medicos
    var comboMedicos = document.getElementById("medicos");
    var comboEspecialidad = document.getElementById("especialidad");
    comboMedicos.options.length = 0;

    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        async: false,
        data: {
            obtenerMedicos: hospitalSeleccionado.title
        },
        success: function (data) {

            if (data.length == 0) {
                mensajeErr("No hay médicos en este hospital");
                return;
            } else {

                medicos = data;

                for (var i in data) {
                    comboMedicos.options[i] = new Option(data[i].nombre + " " + data[i].apellido);
                }

                var e = 0;

                for (var j in medicos[0].especialidades) {
                    e++;
                    comboEspecialidad.options[j] = new Option(medicos[0].especialidades[j]);
                }

                comboEspecialidad.options[e] = new Option("General");

                $("#modalOpciones").modal("hide");
                $("#modalMedicos").modal("show");
            }
        },
        error: function () {
            mensajeErr("Error: No se pudo conectar con el servidor.");
        }
    });

});

$('#medicos').change(function () {
    var comboMedicos = document.getElementById("medicos");
    var comboEspecialidad = document.getElementById("especialidad");
    var l = 0;
    comboEspecialidad.options.length = 0;

    for (var i in medicos) {

        var nombreMedico = medicos[i].nombre + " " + medicos[i].apellido;

        if (nombreMedico.localeCompare(comboMedicos.value) == 0) {

            for (var j in medicos[i].especialidades) {
                l++;
                comboEspecialidad.options[j] = new Option(medicos[i].especialidades[j]);
            }

            comboEspecialidad.options[l] = new Option("General");
        }
    }
});

var medico, espec;

$("#btnMedicos").click(function () {

    var medicoValor = document.getElementById("medicos").value;
    espec = document.getElementById("especialidad").value;

    for (var i in medicos) {
        var a = medicos[i].nombre + " " + medicos[i].apellido;
        if (a.localeCompare(medicoValor) == 0) {
            medico = medicos[i].id;
        }
    }

    $("#modalMedicos").modal("hide");
    $("#modalCalendario").modal("show");


});

//Calendario
var calendar;

YUI().use('calendar', 'datatype-date', 'cssbutton', function (Y) {

    calendar = new Y.Calendar({
        contentBox: "#mycalendar",
        width: '340px',
        showPrevMonth: false,
        showNextMonth: false,
        minimumDate: new Date() ,
        date: new Date(),
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
            },
            success: function (data) {
                mensaje(data)
            },
            error: function () {
                mensajeErr("Error: No se pudo conectar con el servidor.");
            }
        });

    });
});
/* FIN CALENDARIO */

$('#modalCalendario').on('shown.bs.modal', function () {

    var rules;
    var rules2;

    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        async: false,
        data: {
            "horariosOcupados": hospitalSeleccionado.title,
            "medico": medico,
        },
        success: function (data) {
            var r = data.split("&");
            rules = datearray2filter(r[0], r[1]);
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
});

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


