<link rel="stylesheet" href="styles/header.css">

<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<nav class="navbar navbar-inverse" id="barra">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#c-menu" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class=""> 
                <img class="img-circle" src="img/hospital.jpg" alt="icono" id ="icono" align="left"/>
                <a class="navbar-brand" href="/HospitalWeb/SInicio?accion=inicio" id="titulo">Hospital Web</a>
            </div>
        </div>

        <%if (request.getSession().getAttribute("usuario") != null) {%>
        <div class="collapse navbar-collapse" id="c-menu">
            <button class="btn btn-default" id="btnCerrarSesion" title = "Cerrar sesión" onclick="window.location='/HospitalWeb/SUsuario?accion=logout'"><span class="glyphicon glyphicon-log-out micuenta_icono"></span></a></button>
        </div>
        <% }%>

    </div>
</nav>
