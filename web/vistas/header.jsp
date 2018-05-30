<%@page import="Clases.Usuario"%>
<link rel="stylesheet" href="styles/header.css">

<%String tipo = (String) request.getAttribute("tipo");
    Usuario u = (Usuario) request.getSession().getAttribute("usuario");
%>


<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<nav class="navbar navbar-inverse" id="barra">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#c-menu" aria-expanded="false">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class=""> 
                <img class="img-circle" src="img/hospital.jpg" alt="icono" id ="icono" align="left"/>
                <a class="navbar-brand"  <%if (u != null && tipo != null && tipo == "Empleado" || tipo == "Cliente") {%> href="/HospitalWeb/SUsuario?accion=mapaUsuario"  <%}%> id="titulo">Hospital Web</a>
            </div>
        </div>
        <%if (u != null) {%>
        <div class="collapse navbar-collapse" id="c-menu">
            <!-- TODO: Que esta ul solo aparezca si se esta logueado como un usuario cliente o medico -->
            <%if (tipo != null && tipo == "Empleado" || tipo == "Cliente") {%>
            <ul class="nav navbar-nav padding">
                <li><a href="/HospitalWeb/SUsuario?accion=mapaUsuario">Ver mapa<span class="sr-only"></span></a></li>
                <li><a href="/HospitalWeb/SUsuario?accion=panelDatos">Panel de datos</a></li>
            </ul>
            <%}%>
            <button class="btn btn-default" id="btnCerrarSesion" title = "Cerrar sesión" onclick="window.location = '/HospitalWeb/SUsuario?accion=logout'"><span class="glyphicon glyphicon-log-out micuenta_icono"></span></a></button>
        </div>
        <% }%>

    </div>
</nav>
