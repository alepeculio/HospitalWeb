var mapa;
var posInicial;
var marcador;

var filtroCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var departamentos = ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres", "Montevideo"];

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

var hospitalSeleccionado;

function clickHospital (hospital) {
    hospitalSeleccionado = hospital;
    
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "obtener": hospitalSeleccionado.title
        },
        success: function (data) {
            if (data == "NOPE") {
                window.location.assign ("/HospitalWeb/SHospital?Administrador");
            } else {
                modificar (false);
                var partes = data.split ("#");
                $("#detnombre").val (partes[0]);
                $("#dettipo").attr ("disabled", false);
                $("#dettipo").bootstrapToggle (partes[1]);
                $("#detdepartamento").val (partes[2]);
                $("#detcalle").val (partes[3]);
                $("#detnumero").val (partes[4]);
                $("#detlat").val (partes[5]);
                $("#detlng").val (partes[6]);
                $("#detdirectora").val (partes[7]);
                $("#detcorreo").val (partes[8]);
                $("#dettelefono").val (partes[9]);
                $("#modalDetallesHospital").modal("show");
            }
        },
        error: function () {
            window.location.assign ("/HospitalWeb/SHospital?Administrador");
        }
    });
}

function obtenerDep (direccion) {
    for (var i = 0; i < departamentos.length; i++)
        if (direccion.includes (departamentos[i]))
            return departamentos[i];
    
    return "NONE";
}

var filtroNumero = /^([0-9])+$/;

function obtenerDirec (direccion) {
    direccion = direccion.split (",")[0];
    direccion = direccion.split (" ");
    var final = "";
    var fin = direccion.length - (filtroNumero.test (direccion[direccion.length - 1]) ? 1 : 0);
    for (var i = 0; i < fin; i++)
        final += direccion[i] + (i < fin - 1 ? " " : "");
    return final;
}

function recomendar (geocoder, posicion) {
    $("#nombre").val ("");
    $("#directora").val ("");
    $("#correo").val ("");
    $("#telefono").val ("");
    $("#departamento").val ("");
    $("#calle").val ("");
    $("#numero").val ("");
    $("#lat").val ("");
    $("#lng").val ("");
    
    geocoder.geocode ({'location': posicion}, function (results, status) {
        if (status == 'OK') {
            if (results[0] && results[1]) {
                var depto = obtenerDep (results[1].formatted_address);
                if (depto == "NONE")
                    return;
                
                var direc = obtenerDirec (results[0].formatted_address);
                    
                $("#departamento").val (depto);
                $("#calle").val (direc);
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
            "nombre": hospitalSeleccionado.title
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

$("#modalDetallesHospital").on ("shown.bs.modal", function () {
    modificar (false);
});

$("#modalDetallesHospital").on ("hidden.bs.modal", function () {
    $("#divBtnConfirmar").collapse ("hide");
    modificando = false;
});

$("#btnBorrado").click (function () {
    location.reload ();
});

$("#btnBorrarHospital").click (function () {
    $("#modalBorrar").modal ("show");
});

$("#btnIngresarConfirmar").click (function () {
    var nombre = $("#nombre").val ();
    var directora = $("#directora").val ();
    var tipo = $("#tipo").is (":checked") ? "on" : "off";
    var telefono = $("#telefono").val ();
    var correoHospital = $("#correo").val ();
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
    
    if (directora == "") {
        $("#directoraParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#directoraParent").removeClass ("has-error");
    
    if (telefono == "" || !filtroNumero.test (telefono)) {
        $("#telefonoHospitalParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#telefonoHospitalParent").removeClass ("has-error");
    
    if (correoHospital == "" || !emailCorrecto (correoHospital)) {
        $("#correoHospitalParent").addClass ("has-error");
        faltaCampos = true;
    } else
        $("#correoHospitalParent").removeClass ("has-error");
    
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
                        "directora": directora,
                        "tipo": tipo,
                        "correo": correoHospital,
                        "telefono": telefono,
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
    window.location.assign ("/HospitalWeb/SHospital?Administrador");
});

$("#btnModificarHospital").click (function () {
    modificar (!modificando);
});

var modificando = false;

function modificar (modificar) {
    modificando = modificar;
    $("#detnombre").prop ("readonly", !modificar);
    $("#detdirectora").prop ("readonly", !modificar);
    $("#dettipo").prop ("disabled", !modificar);
    $("#dettelefono").prop ("disabled", !modificar);
    $("#detcorreo").prop ("disabled", !modificar);
    $("#detdepartamento").prop ("readonly", !modificar);
    $("#detcalle").prop ("readonly", !modificar);
    $("#detnumero").prop ("readonly", !modificar);
    $("#detlat").prop ("readonly", !modificar);
    $("#detlng").prop ("readonly", !modificar);
}

$("#btnModificarConrfirmar").click (function () {
    if (!modificando)
        return;
    
    var nombre = $("#detnombre").val();
    var directora = $("#detdirectora").val();
    var tipo = $("#dettipo").is(":checked") ? "on" : "off";
    var correo = $("#detcorreo").val();
    var telefono = $("#dettelefono").val();
    var departamento = $("#detdepartamento").val();
    var calle = $("#detcalle").val();
    var numero = $("#detnumero").val();
    var lat = $("#detlat").val();
    var lng = $("#detlng").val();

    var faltaCampos = false;

    if (nombre == "") {
        $("#detnombreParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detnombreParent").removeClass("has-error");
    
    if (directora == "") {
        $("#detdirectoraParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detdirectoraParent").removeClass("has-error");
    
    if (telefono == "" || !filtroNumero.test (telefono)) {
        $("#dettelefonoHospitalParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#dettelefonoHospitalParent").removeClass("has-error");
    
    if (correo == "" || !emailCorrecto (correo)) {
        $("#detcorreoHospitalParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detcorreoHospitalParent").removeClass("has-error");

    if (departamento == "") {
        $("#detdepartamentoParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detdepartamentoParent").removeClass("has-error");

    if (calle == "") {
        $("#detcalleParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detcalleParent").removeClass("has-error");

    if (numero == "") {
        $("#detnumeroParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detnumeroParent").removeClass("has-error");

    if (numero.match(/^[0-9]+$/) == null) {
        $("#detnumeroParent").addClass("has-error");
        faltaCampos = true;
    } else
        $("#detnumeroParent").removeClass("has-error");

    if (faltaCampos)
        return;
    
    $.ajax({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "modificar": "si",
            "viejo_nombre": hospitalSeleccionado.title,
            "nuevo_nombre": nombre,
            "directora": directora,
            "tipo": tipo,
            "correo": correo,
            "telefono": telefono,
            "departamento": departamento,
            "calle": calle,
            "nro": numero,
            "lat": lat,
            "lng": lng
        },
        success: function (data) {
            if (data == "existe")
                $("#modalExiste").modal ("show");
            else
                $("#modalModificado").modal ("show");
        },
        error: function () {
            alert("Error: No se pudo modificar el hospital " + hospitalSeleccionado.title);
        }
    });
});

$("#btnAceptarModificado").click (function () {
    window.location.assign ("/HospitalWeb/SHospital?Administrador");
});

var ciABorrar;

function borrarAdministrador (nombre) {
    ciABorrar = nombre.split ("/")[0].trim ();
    $("#modalPregBorrarAdmin").modal ("show");
}

$("#btnPregBorrarAdminConfirmar").click (function () {
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "eliminarAdmin": "si",
            "nomHospital": hospitalSeleccionado.title,
            "ciAdmin": ciABorrar
        },
        success: function (data) {
            $("#modalAdminBorradoConExito").modal ("show");
        },
        error: function () {
            alert ("Error: No se pudo borrar el administrador");
        }
    });
});

$("#btnABCE").click (function () {
    window.location.assign ("/HospitalWeb/SHospital?Administrador");
});

$("#btnAdministradore").click (function () {
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "obtenerAdministradores": "si",
            "nomHospital": hospitalSeleccionado.title
        },
        success: function (data) {
            if (data == "NOPE") {
                $("#divListadoAdministradores").hide ();
            } else {
                $("#divListadoAdministradores").show ();
                
                var administradores = data.split ("#");
                
                var listado = document.getElementById("listadoAdministradores");
                $("#listadoAdministradores").html ("");
                for (var i = 0; i < administradores.length; i++) {
                    var opt = document.createElement ("button");
                    opt.setAttribute ("role", "button");
                    opt.classList.add ("list-group-item");
                    opt.classList.add ("list-group-item-action");
                    var p = administradores[i].split ("/");
                    opt.innerHTML = p[0] + "    /   " + p[1];
                    
                    opt.onclick = function () {
                        borrarAdministrador (this.innerHTML.toString ());
                    };
                    
                    listado.appendChild(opt);
                }
            }
            $("#modalAdministradores").modal ("show");
        },
        error: function () {
            alert ("Error: No se pueden obtener los administradores del hospital " + hospitalSeleccionado.title);
        }
    });
});

$("#btnCerrarAdministradores").click (function () {
    $("#modalDetallesHospital").modal ("show");
});

$("#btnAgregarNuevoAdministradores").click (function () {
    var ciNuevo = $("#ciNuevoAdmin").val ().toString ().trim ();
    var correoNuevo = $("#correoNuevoAdmin").val ().toString ().trim ();
    
    var errores = false;
    
    if (ciNuevo == "" || !filtroNumero.test (ciNuevo) || !ciNuevo.length == 8 || !cedulaCorrecta (ciNuevo.substring (0, 7), ciNuevo.charAt (7))) {
        $("#divCiNuevoAdmin").addClass("has-error");
        errores = true;
    } else
        $("#divCiNuevoAdmin").removeClass("has-error");
    
    if (correoNuevo == "" || !emailCorrecto (correoNuevo)) {
        $("#divCorreoNuevoAdmin").addClass("has-error");
        errores = true;
    } else
        $("#divCorreoNuevoAdmin").removeClass("has-error");
    
    if (errores)
        return;
    
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SHospital",
        data: {
            "agregarAdmin": "si",
            "ci": ciNuevo,
            "correo": correoNuevo,
            "nomHospital": hospitalSeleccionado.title
        },
        success: function (data) {
            if (data == "")
                $("#modalAdministradorIngresadoConExito").modal ("show");
            else {
                $("#msjErrorAgregarAdmin").html (data);
                $("#modalAdministradorYaExiste").modal ("show");
            }
        },
        error: function () {
            alert ("Error: No se pudo cargar un nuevo admin");
        }
    });
});

$("#btnAceptarAdministradorYaAgregado").click (function () {
    window.location.assign ("/HospitalWeb/SHospital?Administrador");
});

function emailCorrecto(email) {
    return filtroCorreo.test(email);
}

function cedulaCorrecta(ci, digVer) {
    var dig = "2987634";
    var sum = 0;
    for (var i = 0; i < dig.length; i++)
        sum += (ci[i] * dig[i]) % 10;
    return 10 - sum % 10 === digVer * 1;
}

$("#modalIngresado").on ("hidden.bs.modal", function () {
    window.location.assign ("/HospitalWeb/SHospital?Administrador");
});

$("#modalAdministradorIngresadoConExito").on ("hidden.bs.modal", function () {
    window.location.assign ("/HospitalWeb/SHospital?Administrador");
});