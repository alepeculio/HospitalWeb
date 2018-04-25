var mapa;
var posInicial;
var marcador;

var hospitales = [];

function agregarHospital (nombre, lat, lng) {
    hospitales.push ([nombre, lat, lng]);
}

function initMapa () {
    posInicial = new google.maps.LatLng (-32.3209812, -58.0799678);
    var opciones = {
        center: posInicial,
        zoom: 14,
        mapTypeControlOptions: {
                mapTypeIds: ['roadmap']
        },
          disableDefaultUI: true
        ,
        styles:[
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
    mapa = new google.maps.Map (document.getElementById ("mapa"), opciones);
    
    var geocoder = new google.maps.Geocoder;

    mapa.addListener ("click", function (event) {
        if (marcador != null)
            marcador.setMap (null);

        marcador = new google.maps.Marker ({
            position: event.latLng
        });
        marcador.setMap (mapa);
        mapa.setCenter (event.latLng);
        //mapa.setZoom (18);
        recomendar(geocoder, event.latLng);
        
        $("#btnConfirmar").prop ("disabled", false);
    });
    
    for (var i = 0; i < hospitales.length; i++) {
        new google.maps.Marker ({
            position: new google.maps.LatLng (hospitales[i][1], hospitales[i][2]),
            map: mapa
        });
    }
}

function recomendar (geocoder, posicion) {
    geocoder.geocode({'location': posicion}, function(results, status) {
        if (status == 'OK') {
            if (results[0]) {
                var dep = results[0].formatted_address.split (",");
                dep = dep[dep.length - 2];
                if (dep.split (" ").length === 3) {
                    dep = "Montevideo";
                } else {
                    dep = dep.split ("Departamento de ")[1];
                }
                
                var dir = results[0].formatted_address.split (",")[0];
                
                var num = results[0].formatted_address.split (",")[0].split(" ");
                num = num[num.length - 1];
                
                var direccion = "";
                if (/^\d+$/.test(num)) {
                    var p = dir.split (" ");
                    for (var i = 0; i < p.length - 1; i++) {
                        direccion += p[i] + " ";
                    }
                } else {
                    direccion = dir;
                    num = "";
                }
                if (direccion.charAt(direccion.length - 1) == ' ') {
                    direccion = direccion.substr(0, direccion.length - 1);
                }
                $("#departamento").val (dep);
                $("#calle").val (direccion);
                $("#numero").val (num);
                $("#lat").val (posicion.lat ());
                $("#lng").val (posicion.lng ());
            } else {
                window.alert('No se encuentran resultados');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function cargarHospital () {
    var nombre = document.getElementById ("nombre").value;

    if (nombre == "") {
        alert ("Ingrese un nombre");
        return;
    }

    if (marcador == null) {
        alert ("Seleccione una posicion en el mapa");
        return;
    }

    $.ajax ({
        type: "POST",
        url: "php/hospital/addHospital.php",
        dataType: "JSON",
        data: {
            "nombre": nombre,
            "lat": marcador.position.lat (),
            "lng": marcador.position.lng ()
        },
        success: function (data) {
            alert ("Agregado!");

            marcador.setMap (null);
            document.getElementById ("nombre").value = "";
        }
    });
}

$("#myModal").on ("shown.bs.modal", function () {
    $("#nombre").focus ();
});