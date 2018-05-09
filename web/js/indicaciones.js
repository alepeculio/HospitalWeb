var mapa;
var posInicial;
var marcador;
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

    servicio = new google.maps.DirectionsService;

    direccion = new google.maps.DirectionsRenderer ({
      suppressMarkers: true,
      map: mapa
  });


    /*OBTENER UBICACION*/

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){

        posInicial = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        mapa.setCenter(posInicial);

        /*crear marcador con ubicacion*/

        new google.maps.Marker({
            position: posInicial,
            title: "TÚ",
            icon: {
                url: "img/persona.png",
                scaledSize: new google.maps.Size(29, 35)
            },
            map: mapa
        });



    }, function() {
     posInicial = new google.maps.LatLng(-32.3209812, -58.0799678);
 });

  }else{

   posInicial = new google.maps.LatLng(-32.3209812, -58.0799678);
}

/* FIN OBTENER UBICACION*/

for (var i = 0; i < hospitales.length; i++)
    new google.maps.Marker({
        position: new google.maps.LatLng(hospitales[i][1], hospitales[i][2]),
        title: hospitales[i][0],
        icon: {
            url: "img/icono_h.png",
            scaledSize: new google.maps.Size(29, 35)
        },
        map: mapa
    }).addListener("click", function () {
        clickHospital(this);
    });

}

var hospitalSeleccionado;

function clickHospital(hospital) {

    var selectedMode = document.getElementById('mode').value;

    var peticion = {
        origin: posInicial,
        destination: hospital.position,
        travelMode: google.maps.TravelMode[selectedMode]
    };




    /*OBTENER INDICACIONES*/

    servicio.route (peticion, function (resultado, estado) {
        if (estado == "OK")
          direccion.setDirections (resultado);
  });

}
