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
    mapa.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push (document.getElementById ("leyenda"));
    
    var geocoder = new google.maps.Geocoder;

    mapa.addListener ("click", function (event) {
        if (marcador != null)
            marcador.setMap (null);

        marcador = new google.maps.Marker ({
            position: event.latLng,
            animation: google.maps.Animation.DROP,
            icon: {
                url: "img/icono_mas.png",
                scaledSize: new google.maps.Size(29, 35)
            }
        });
        marcador.setMap (mapa);
        mapa.setCenter (event.latLng);
        recomendar(geocoder, event.latLng);
        
        $("#btnConfirmar").prop ("disabled", false);
    });
    
    for (var i = 0; i < hospitales.length; i++)
       new google.maps.Marker ({
            position: new google.maps.LatLng (hospitales[i][1], hospitales[i][2]),
            title: hospitales[i][0],
            icon: {
                url: "img/icono_h.png",
                scaledSize: new google.maps.Size(29, 35)
            },
            map: mapa
        }).addListener ("click", function () {
            clickHospital (this);
        });
}

var hospitalABorrar;

function clickHospital (hospital) {
    hospitalABorrar = hospital;
    
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "obtener": hospitalABorrar.title
        },
        success: function (data) {
            if (data == "NOPE") {
                window.location.assign ("/HospitalWeb/SHospital?cargar");
            } else {
                var partes = data.split ("@");
                $("#borrarNombre").html (partes[0]);
                $("#borrarPublico").html (partes[1]);
                $("#borrarDepartamento").html (partes[2]);
                $("#borrarDireccion").html (partes[3]);
                $("#modalBorrar").modal("show");
            }
        },
        error: function () {
            window.location.assign ("/HospitalWeb/SHospital?cargar");
        }
    });
}

function recomendar (geocoder, posicion) {
    geocoder.geocode({'location': posicion}, function(results, status) {
        if (status == 'OK') {
            if (results[0]) {
                var dep = results[0].formatted_address.split (",");
                dep = dep[dep.length - 2];
                
                if (dep.split (" ").length === 3)
                    dep = "Montevideo";
                else
                    dep = dep.split ("Departamento de ")[1];
                
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
                if (direccion.charAt(direccion.length - 1) == ' ')
                    direccion = direccion.substr(0, direccion.length - 1);
                    
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

$("#btnBorrarConfirmar").click (function () {
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "nombre": $("#borrarNombre").html ()
        },
        success: function (data) {
            $("#modalBorrado").modal ("show");
        },
        error: function () {
            alert ("Error: No se pudo borrar el hospital " + $("#borrarNombre").html ());
        }
    });
});

$("#modalIngresar").on ("shown.bs.modal", function () {
    $("#nombre").focus ();
});

$("#btnBorrado").click (function () {
    location.reload ();
});

$("#btnIngresarConfirmar").click (function () {
    var nombre = $("#nombre").val ();
    var tipo = $("#tipo").is (":checked") ? "on" : "off";
    var departamento = $("#departamento").val ();
    var calle = $("#calle").val ();
    var numero = $("#numero").val ();
    var lat = $("#lat").val ();
    var lng = $("#lng").val ();
    
    var faltaCampos = false;
    
    if (nombre == "") {
        $("#nombreParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#nombreParent").removeClass ("has-error");
    
    if (departamento == "") {
        $("#departamentoParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#departamentoParent").removeClass ("has-error");
    
    if (calle == "") {
        $("#calleParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#calleParent").removeClass ("has-error");
    
    if (numero == "") {
        $("#numeroParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#numeroParent").removeClass ("has-error");
    
    if (numero.match (/^[0-9]+$/) == null) {
        $("#numeroParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#numeroParent").removeClass ("has-error");
    
    if (faltaCampos)
        return;

    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "existe": $("#nombre").val ()
        },
        success: function (data) {
            if (data == "no") {
                $.ajax ({
                    type: "POST",
                    url: "/HospitalWeb/SHospital",
                    data: {
                        "ingresarNuevo": "si",
                        "nombre": nombre,
                        "tipo": tipo,
                        "departamento": departamento,
                        "calle": calle,
                        "nro": numero,
                        "lat": lat,
                        "lng": lng
                    },
                    success: function (data) {
                        $("#modalIngresado").modal ("show");
                    },
                    error: function () {
                        alert ("Error: No se pudo ingresar el hospital " + $("#nombre").val ());
                    }
                });
            } else {
                $("#modalExiste").modal ("show");
            }
        },
        error: function () {
            alert ("Error: No se pudo ingresar el hospital " + $("#nombre").val ());
        }
    });
});

$("#btnAceptarIngreso").click (function () {
    window.location.assign ("/HospitalWeb/SHospital?cargar");
});