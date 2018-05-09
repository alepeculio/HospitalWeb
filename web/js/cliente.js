var mapa;
var posInicial;
var marcador;
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
        hospitalSeleccionado = hospital;
        window.location = "/HospitalWeb/SHospital?verHospital="+hospital.title;        
    }

    $('#btnBuscar').click(function(){

        var texto = $('#txtBuscar').val().toString();

        if(texto == ""){

            document.getElementById('mensaje_buscar').innerHTML = "Ingrese texto a buscar";
            $("#modal_buscar").modal();
            return;
        }

        var flag = false;

        for (var i = 0; i < hospitales.length; i++){
            if(texto.localeCompare(hospitales[i][0]) == 0){
                flag = true;
            }
        }

        if(flag == false){
            document.getElementById('mensaje_buscar').innerHTML = "No hay resultados para su búsqueda";
            $("#modal_buscar").modal();
            return;
        }

        window.location ="/HospitalWeb/SHospital?verHospital="+texto;
    });
