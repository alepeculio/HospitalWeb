<%@page import="java.util.List"%>
<%@page import="Clases.Hospital"%>
<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <jsp:include page="include_css.html"/>
        <jsp:include page="include_js.html"/>
        <title>Mapa Usuario</title>
        <link rel="stylesheet" href="styles/cargaHospital.css">
        <link rel="stylesheet" type="text/css" href="css/awesomplete.css">
        
        <script>
            if (!window.location.toString ().includes ("/HospitalWeb/SUsuario?accion=mapaUsuario"))
                window.location.assign ("/HospitalWeb/SUsuario?accion=mapaUsuario");
        </script>

    </head>
    <body background="img/fondo.png">
        <!-- Header -->
        <jsp:include page="header.jsp"/>
        
        <%  List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales"); %>
        <%  String listaHospitales = ""; %>

        <%  for (Hospital h : hospitales) {%>
        <%      listaHospitales += h.getNombre() + ","; %>
        <%  } %>
        
        <div class="fondo2 mapa">
            <div id="mapa" style="width: 88vw; height: 80vh;"></div>
            <div id="leyenda">
                <h3>Ayuda</h3>
                <span class="glyphicon glyphicon-search iconoLeyenda" aria-hidden="true"></span><text>Buscar Hospital</text>
                <p>Ingrese el nombre de un hospital en la barra de busqueda o mueva el mapa utilizando el click izquierdo del mouse para buscar un hospital.</p>
                <hr>
                <img src="img/icono_h.png" class="imgLeyenda"><text>Pedir turno</text>
                <p>Una vez encuentra el hospital haga click izquierdo en el y le mostrara las opciones que tiene con el mismo.</p>
            </div>
            <div id="busqueda">
                <input class="awesomplete" id="txtBuscar" data-list="<%= listaHospitales%>"/>
                <button class="btn btn-default btn-ms" id="btnBuscar" type="button" role="button" aria-label="Right Align">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                </button>
            </div>
        </div>
                
        <!-- Panel opciones -->
        <div class="modal fade" id="modalOpciones" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Opciones</h4>
                    </div>
                    <div class="modal-body" id="divOpciones">
                        <button id="btnVerInfo" class="btn btn-default">Ver informacion del hospital</button>
                        <button id="btnReservarTurno" class="btn btn-default">Reservar Turno</button>
                        <button id="btnSuscripcion" class="btn btn-default">Solicitar suscripcion</button>
                        <div id="divEstadoSus">
                            <label>Estado de Suscripcion</label>
                            <p id="estadoDeSusc">Activada</p>
                        </div>
                        <div id="divMostrarRuta">
                            <label>Mostrar Ruta</label>
                            <select id="mode" name="mode">
                                <option value="DRIVING">Conduciendo</option>
                                <option value="WALKING">Caminando</option>
                                <option value="BICYCLING">Bicicleta</option>
                                <option value="TRANSIT">Transporte Público</option>
                            </select>
                            <button id="btnMostrarRuta" class="btn btn-default" data-dismiss="modal">Ver</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <jsp:include page="dialogos.html"/>
        <script src="js/pantallaUsuarios.js"></script>
        <%  for (Hospital h : hospitales) { %>
            <script>
                agregarHospital ('<%= h.getNombre () %>', <%= h.getLatitud () %>, <%= h.getLongitud () %>);
            </script>
        <%  } %>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1gnU_q4aEtnUkQGKyZbaT--TH76oRL-4&callback=initMapa" async defer></script>
        <script src="js/awesomplete.js" type="text/javascript" async></script>
    </body>
</html>
