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

var hospitalSeleccionado;
function clickHospital(hospital) {
    hospitalSeleccionado = hospital;
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "obtener": hospitalSeleccionado.title
        },
        success: function (data) {
            if (data == "NOPE") {
                window.location.assign("/HospitalWeb/SHospital?Administrador");
            } else {
                var partes = data.split("#");
                //$("#detnombre").val (partes[0]);
                //$("#dettipo").attr ("disabled", false);
                //$("#dettipo").bootstrapToggle (partes[1]);
                //$("#detdepartamento").val (partes[2]);
                //$("#detcalle").val (partes[3]);
                //$("#detnumero").val (partes[4]);
                //$("#detlat").val (partes[5]);
                //$("#detlng").val (partes[6]);
                //$("#detdirectora").val (partes[7]);
                //$("#detcorreo").val (partes[8]);
                //$("#dettelefono").val (partes[9]);
                $("#modalReservas").modal("show");
            }
        },
        error: function () {
            window.location.assign("/HospitalWeb/SUsuario?accion=reservas");
        }
    });
}

var texto;
$('#btnBuscar').click(function () {

    texto = $('#txtBuscar').val().toString();
    if (texto == "") {

        document.getElementById('mensaje_buscar').innerHTML = "Ingrese texto a buscar";
        $("#modal_buscar").modal();
        return;
    }


    for (var i = 0; i < marcadores.length; i++) {
        if (texto.localeCompare(marcadores[i].title) == 0) {
            google.maps.event.trigger(marcadores[i], 'click');
            return;
        }
    }

    document.getElementById('mensaje_buscar').innerHTML = "No hay resultados para su búsqueda";
    $("#modal_buscar").modal();
    return;
});
var nombreH;
$('#dia').change(function () {

    var dia = $("#dia").val().toString();
    //anio-mes-dia

//    if (texto == "") {
//        nombreH = hospitalSeleccionado.title;
//    } else {
//        nombreH = texto;
//    }

    console.log(hospitalSeleccionado.title);

});

//Calendario

YUI().use('calendar', 'datatype-date', 'cssbutton', function (Y) {

    // Create a new instance of calendar, placing it in
    // #mycalendar container, setting its width to 340px,
    // the flags for showing previous and next month's
    // dates in available empty cells to true, and setting
    // the date to today's date.
    var calendar = new Y.Calendar({
        contentBox: "#mycalendar",
        width: '340px',
        showPrevMonth: true,
        showNextMonth: true,
        date: new Date()}).render();

    // Get a reference to Y.DataType.Date
    var dtdate = Y.DataType.Date;

    // Listen to calendar's selectionChange event.
    calendar.on("selectionChange", function (ev) {

        var newDate = ev.newSelection[0];

        // Format the date and output it to a DOM
        // element.
        //Y.one("#selecteddate").setHTML(dtdate.format(newDate));

        /* SABEEEE */

        $.ajax({
            type: "POST",
            url: "/HospitalWeb/SHospital",
            data: {
                "obtenerHorarios": hospitalSeleccionado.title,
                "dia": dtdate.format(newDate)
            },
            success: function (data) {
                if (data == "NOPE") {
                    document.getElementById('mensaje_buscar').innerHTML = "No hay horarios disponibles";
                    $("#modal_buscar").modal();
                } else if (data == "") {

                    document.getElementById('mensaje_buscar').innerHTML = "Ho hay horarios de atención para ese día";
                    $("#modal_buscar").modal();
                } else {
                    document.getElementById('mensaje_buscar').innerHTML = data;
                    $("#modal_buscar").modal();
                }
            },
            error: function () {
                alert("ERROR FUNCTION");
                //window.location.assign("/HospitalWeb/SUsuario?accion=reservas");
            }
        });

    });
});