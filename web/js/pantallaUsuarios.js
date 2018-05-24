var mapa;
var posInicial;
var marcadores = [];
var hospitales = [];
var servicio;
var direccion;

function agregarHospital (nombre, lat, lng) {
    hospitales.push ([nombre, lat, lng]);
}

function initMapa () {
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
                        "visibility": "on"
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
    direccion = new google.maps.DirectionsRenderer ({
        suppressMarkers: true,
        map: mapa
    });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (function (position) {
            posInicial = new google.maps.LatLng (position.coords.latitude, position.coords.longitude);

            new google.maps.Marker ({
                position: posInicial,
                title: "Posicion Actual",
                icon: {
                    url: "img/persona.png",
                    scaledSize: new google.maps.Size(29, 35)
                },
                map: mapa
            });
        }, function () {
            posInicial = new google.maps.LatLng (-32.3209812, -58.0799678);
        });
    } else
        posInicial = new google.maps.LatLng (-32.3209812, -58.0799678);
    
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
        marcadores.push (marcador);
    }
}

function clickHospital (hospital) {
    hospitalSeleccionado = hospital;
    $("#modalOpciones").modal ("show");
}

$("#btnBuscar").click (function () {
    for (var i = 0; i < marcadores.length; i++)
        if (marcadores[i].title === $("#txtBuscar").val ()) {
            centrarHospital (marcadores[i]);
            return;
        }
    
    mensajeErr ("No hay ningun hospital con ese nombre");
});

function centrarHospital (hospital) {
    mapa.setCenter (hospital.position);
    mapa.setZoom (16);
}

$("#btnVerInfo").click (function () {
    window.location = "/HospitalWeb/SHospital?verHospital=" + hospitalSeleccionado.title;
});

$("#btnSuscripcion").click (function () {
    pregunta ("Desea solicitar suscripcion en " + hospitalSeleccionado.title + "?", "solicitarSuscripcion");
});

function solicitarSuscripcion () {
    $("#modalOpciones").modal ("hide");
    alert ("solicitar en " + hospitalSeleccionado.title);
}

$("#btnMostrarRuta").click (function () {
    var selectedMode = document.getElementById ("mode").value;

    var peticion = {
        origin: posInicial,
        destination: hospitalSeleccionado.position,
        travelMode: google.maps.TravelMode[selectedMode]
    };

    servicio.route (peticion, function (resultado, estado) {
        if (estado == "OK")
            direccion.setDirections (resultado);
    });
});

$("#btnReservarTurno").click (function () {
    alert ("panel con el calendario ese");
});