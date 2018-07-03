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
        <script src="js/yui-min.js"></script>
    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>

        <% List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales");%>
        <% String listaHospitales = ""; %>
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

        <!-- Panel medicos hospital -->
        <div class="modal fade" id="modalMedicos" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onsubmit="return false">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h3 class="modal-title" style="text-align: center;"><strong>Reserva web</strong></h3>
                        </div>
                        <!-- PRUEBAS -->

                        <div class="modal-body"> 
                            
                        </div>
                        <!-- FIN PRUEBAS -->

                        <div class="modal-footer" style="text-align: center;">
                            <strong>Seleccione un médico.</strong>
                            <p id="mensaje_medicos"> </p>
                        </div>

                </div>
            </div>
        </div>

        <!-- CIERRA MODAL-->

        <!-- Panel medicos hospital -->
        <div class="modal fade" id="modalReservas" role="dialog" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onsubmit="return false">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h3 class="modal-title" style="text-align: center;"><strong>Reserva web</strong></h3>
                        </div>
                        <!-- PRUEBAS -->

                        <div class="modal-body"> 
                            <div class="yui3-skin-sam" align="center">
                                
                                <div id="mycalendar"></div>
                            </div>
                        </div>
                        <!-- FIN PRUEBAS -->

                        <div class="modal-footer" style="text-align: center;">
                            <strong>Seleccione un día para reservar su turno.</strong>
                        </div>

                </div>
            </div>
        </div>

        <!-- CIERRA MODAL-->







        <!-- MODAL ERRORES DIA -->
        <div class="modal fade" id="modal_buscar" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <strong style="text-align: center;"><p id="mensaje_buscar"></p></strong>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>

            </div>
        </div>

        <!-- MODAL -->



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
