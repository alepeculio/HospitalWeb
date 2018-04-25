 <link rel="stylesheet" href="style/header.css">
<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<nav class="navbar navbar-inverse" id="barra">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class=""> 
                <img class="img-circle" src="img/hospital.jpg" alt="icono" id ="icono" align="left"/>
                <a class="navbar-brand" href="#" id="titulo">Hospital Web</a>
            </div>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="c-menu">
            <ul class="nav navbar-nav">
                <li><a id="menu" href="/HospitalWeb/SInicio">Inicio <span class="sr-only"></span></a></li>
                <li><a id="menu" href="#">¿Por qué Hospital Web?</a></li>
                <li><a id="menu" href="#" >Ayuda</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a id="menu" href="#" class="btn btn-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Mi cuenta <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/HospitalWeb/SInicio?perfil">Ver Perfil <span class="glyphicon glyphicon-user"></span></a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Cerrar Sesión <span class="glyphicon glyphicon-log-out"></span></a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
