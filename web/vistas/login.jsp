<%-- 
    Document   : login
    Created on : Apr 10, 2018, 9:39:35 PM
    Author     : Ale
--%>

<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<!DOCTYPE html>
<html>
    <head>  
        <jsp:include page="include_css.html"/>
        <title>Login</title>

    </head>
    <body background="img/fondo.png">
        <!-- Header -->
        <jsp:include page="header.jsp"/>

        <div class="container" style="margin-top: 20vh">
            <div class="row">
                <div class="col-sm-5">
                    <div class="panel" style="padding: 20px">
                        <h1>
                            Inicie Sesión!
                        </h1>
                        </br>
                        <form accept-charset="UTF-8" role="form" method="POST" action="/HospitalWeb/SUsuario?accion=login">
                            <div class="form-group">
                                <input class="form-control" title="Cedula de identidad (sin puntos ni guiones)" required placeholder="C.I." name="ci" type="number" autofocus="" max="99999999">
                            </div>
                            <div class="form-group">
                                <input class="form-control" title="Contraseña" required placeholder="Contraseña" name="contrasenia" type="password">
                            </div>
                            <div class="checkbox" style="text-align: center">
                                <label>
                                    <input name="recordarme" type="checkbox" value="Recordarme"> Recordarme
                                </label>
                            </div>

                            <% String mensaje_error = (String) request.getAttribute("mensaje_error");
                                if (mensaje_error != null) {
                                    out.println("<div style='text-align: center;padding-top:3pt; padding-bottom:6pt; color:red; font-size:11pt; font-weight:bold'>" + mensaje_error + "</div>");
                                }%>

                            <input class="btn btn-lg btn-success btn-block" type="submit" value="Iniciar Sesion">
                        </form>
                    </div>

                </div>
                <div class="col-sm-1"></div>
                <div class="col-sm-6">
                    <div class="panel" style="padding: 20px">
                        <h1>
                            Bienvenido!
                        </h1>
                        </br>
                        <p>
                            Hospital Web es el sitio de autogestión de consultas médicas, el cual le permite de forma rápida, segura y desde la comodidad de su hogar, solicitar una cita con su médico de preferencia.                        
                        </p>
                        <p>
                            Para comenzar a utilizar nuestro servicio, diríjase al hospital mas cercano con sus datos personales y solicite la inscripción de forma gratuita.
                            Luego de realizado el proceso ya podrá acceder a su cuenta desde aquí.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="include_js.html"/>
    </body>
</html>

