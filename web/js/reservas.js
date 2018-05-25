//Calendario
var calendar;

YUI().use('calendar', 'datatype-date', 'cssbutton', function (Y) {

    calendar = new Y.Calendar({
        contentBox: "#mycalendar",
        width: '340px',
        showPrevMonth: true,
        showNextMonth: true,
        date: new Date()
    }).render();
    // Get a reference to Y.DataType.Date
    var dtdate = Y.DataType.Date;

    // Listen to calendar's selectionChange event.
    calendar.on("selectionChange", function (ev) {

        var newDate = ev.newSelection[0];
//        $.ajax({
//            type: "POST",
//            url: "/HospitalWeb/SHospital",
//            data: {
//                "obtenerHorarios": hospitalSeleccionado.title,
//                "dia": dtdate.format(newDate)
//            },
//            success: function (data) {
//                if (data == "NOPE") {
//                    document.getElementById('mensaje_buscar').innerHTML = "No hay horarios disponibles";
//                    $("#modal_buscar").modal();
//                } else if (data == "") {
//
//                    document.getElementById('mensaje_buscar').innerHTML = "Ho hay horarios de atención para ese día";
//                    $("#modal_buscar").modal();
//                } else {
//                    document.getElementById('mensaje_buscar').innerHTML = data;
//                    $("#modal_buscar").modal();
//                }
//            },
//            error: function () {
//                alert("ERROR FUNCTION");
//                //window.location.assign("/HospitalWeb/SUsuario?accion=reservas");
//            }
//        });

    });
});
/* FIN CALENDARIO */

var mapa;
var posInicial;
var marcadores = [];
var hospitales = [];
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
    for (var i = 0; i < hospitales.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(hospitales[i][1], hospitales[i][2]),
            title: hospitales[i][0],
            icon: {
                url: "img/icono_h.png",
                scaledSize: new google.maps.Size(29, 35)
            },
            map: mapa
        });
        marker.addListener("click", function () {
            clickHospital(this);
        });
        marcadores.push(marker);
    }

}


function clickHospital(hospital) {
    hospitalSeleccionado = hospital;
    $("#modalReservas").modal("show");
}

var texto;
$('#btnBuscar').click(function () {

    texto = $('#txtBuscar').val().toString();
    if (texto == "") {

        document.getElementById('mensaje_buscar').innerHTML = "Ingrese texto a buscar";
        $("#modal_buscar").modal();
        return;
    }

    for (var i = 0; i < marcadores.length;
            i++
            ) {
        if (texto.localeCompare(marcadores[i].title) == 0) {
            google.maps.event.trigger(marcadores[i], 'click');
            return;
        }
    }

    document.getElementById('mensaje_buscar').innerHTML = "No hay resultados para su búsqueda";
    $("#modal_buscar").modal();
    return;
});


$('#modalReservas').on('shown.bs.modal', function () {

    var rules;
    var rules2;

    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        async: false,
        data: {
            "horariosOcupados": hospitalSeleccionado.title
        },
        success: function (data) {
            var r = data.split("&");
            rules = datearray2filter(r[0], r[1]);
        },
        error: function () {
            alert("ERROR FUNCTION");
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