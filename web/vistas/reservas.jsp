<%@page import="java.util.List"%>
<%@page import="Clases.Hospital"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <jsp:include page="include_css.html"/>
    <jsp:include page="include_js.html"/>
    <title>Inicio</title>
    <link rel="stylesheet" href="styles/cargaHospital.css">
    <link rel="stylesheet" type="text/css" href="css/awesomplete.css">
</head>
<body background="img/fondo.png">
    <jsp:include page="header.jsp"/>

    <% List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales");%>
        <% String listaHospitales=""; %>
        <div class="fondo boton">
            <strong>Seleccione o busque un hospital para reservar.</strong>
        </div> 

        <% for (Hospital h : hospitales) {%>
        <% listaHospitales += h.getNombre() + ",";%>
        <%}%>

        <div class="fondo boton">

            <input class="awesomplete" id="txtBuscar" data-list="<%= listaHospitales%>"/>
            <button class="btn btn-default btn-ms" id="btnBuscar" type="button" role="button" aria-label="Right Align">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            </button> 
        </div>


        <div class="fondo mapa">
            <div id="mapa" style="width: 78vw; height: 70vh;"></div>
        </div>

        <!-- MODAL ERRORES DIA -->
        <div class="modal fade" id="modal_buscar" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p id="mensaje_buscar"></p>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>

            </div>
        </div>

        <!-- MODAL -->

        <!-- Panel detalles hospital -->
        <div class="modal fade" id="modalReservas" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onsubmit="return false">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h3 class="modal-title" style="text-align: center;">Reserva Web</h3>


                            <!--PRUEBA -->
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#home">Atención</a></li>
                                <li><a data-toggle="tab" href="#menu1">Vacunación</a></li>
                                <li><a data-toggle="tab" href="#menu2">Carné de Salud</a></li>
                            </ul>

                            <div class="tab-content">
                              <div id="home" class="tab-pane fade in active">
                                <h3>HOME</h3>
                                <p>Some content.</p>
                            </div>
                            <div id="menu1" class="tab-pane fade">
                                <h3>Menu 1</h3>
                                <p>Some content in menu 1.</p>
                            </div>
                            <div id="menu2" class="tab-pane fade">
                                <h3>Menu 2</h3>
                                <p>Some content in menu 2.</p>
                            </div>
                        </div>
                        <!--PRUEBA -->
                    </div>
                    <div class="modal-footer" style="text-align: center;">
                        <button type="button" class="btn btn-lg btn-successs" id="btnContinuar">Continuar</button>  
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- CIERRA MODAL-->

    <script src="js/reservas.js"></script>
    <% for (Hospital h : hospitales) {%>
    <script>
        agregarHospital('<%= h.getNombre()%>', <%= h.getLatitud()%>, <%= h.getLongitud()%>);
    </script>
    <%}
    %>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAv3TfTf8HC_onB7FyU3cQ1n8ckH4uE5rs&callback=initMapa" async defer></script>
    <script src="js/awesomplete.js" type="text/javascript" async></script>
    </html>
