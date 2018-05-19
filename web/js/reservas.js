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

    var flag = false;

    for (var i = 0; i < hospitales.length; i++) {
        if (texto.localeCompare(hospitales[i][0]) == 0) {
            flag = true;
        }
    }

    if (flag == false) {
        document.getElementById('mensaje_buscar').innerHTML = "No hay resultados para su búsqueda";
        $("#modal_buscar").modal();
        return;
    }

    $("#modalReservas").modal("show");
});


//aiuda

$('#dia').change(function () {

    var nombreH;

    var dia = $("#dia").val().toString();

    //anio-mes-dia

    if (texto != "") {
        nombreH = texto;
    } else {
        nombreH = hospitalSeleccionado.title;
    }

    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "obtenerHorarios": nombreH,
            "dia": dia
        },
        success: function (data) {
            if (data == "NOPE") {
                window.location.assign("/HospitalWeb/SHospital?Administrador");
            } else {

            }
        },
        error: function () {
            window.location.assign("/HospitalWeb/SUsuario?accion=reservas");
        }
    });
});

/*
 var carreras = ["Tecnologo", "Medico", "Abogado"];
 
 var combo = document.getElementById("combo"); /* Para no tener que llamar a cada rato a getElementById 
 for (var i = 0; i < carreras.length; i++) {
 combo.options[i] = new Option(carreras[i]);
 }
 */