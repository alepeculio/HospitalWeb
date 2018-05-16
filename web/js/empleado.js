$("#btnCambiar").click (function () {
    var passActual = $("#passActual").val ();
    var passNueva = $("#passNueva").val ();
    
    var error = false;
    
    if (passActual == "") {
        $("#actualParent").addClass ("has-error");
        error = true;
    } else
        $("#actualParent").removeClass("has-error");
    
    if (passNueva == "") {
        $("#nuevaParent").addClass ("has-error");
        error = true;
    } else
        $("#nuevaParent").removeClass("has-error");
    
    if (passActual == passNueva) {
        $("#actualParent").addClass ("has-error");
        $("#nuevaParent").addClass ("has-error");
        error = true;
    } else {
        $("#actualParent").removeClass("has-error");
        $("#nuevaParent").removeClass("has-error");
    }
    
    if (error)
        return;
    
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SUsuario",
        data: {
            accion: "passCorrecta",
            pass: passActual
        },
        success: function (data) {
            if (data == "ERR") {
                $("#actualParent").addClass ("has-error");
            } else if (data == "OK") {
                $("#actualParent").removeClass ("has-error");
                
                pregunta ("Esta seguro del cambio de contraseña?", "cambiarPass", "'" + passNueva + "'");
            }
        },
        error: function () {
            alert ("Error: No se pudo contactar el servidor");
        }
    });
});

function cambiarPass (nueva) {
    $.ajax ({
        type: "POST",
        url: "/HospitalWeb/SUsuario",
        data: {
            accion: "cambiarPass",
            pass: nueva
        },
        success: function (data) {
            if (data == "ERR") {
                $("#nuevaParent").addClass ("has-error");
            } else if (data == "OK") {
                $("#nuevaParent").removeClass ("has-error");
                mensaje ("Contraseña cambiada");
            }
        },
        error: function () {
            alert ("Error: No se pudo conectar con el servidor");
        }
    });
}