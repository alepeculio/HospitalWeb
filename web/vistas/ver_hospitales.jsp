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
    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>

        


        <!-- 
        <div class="fondo mapa">
            <div id="mapa" style="width: 78vw; height: 70vh;"></div>
        </div>

        <div class="fondo boton">
            <strong>Seleccione un hospital para reservar su turno.</strong>
        </div> -->


        <!-- Panel detalles hospital -->
        <div class="modal fade" id="modalDetallesHospital" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onsubmit="return false">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h3 class="modal-title">Reserva de Turno</h3>
                        </div>
                        <div class="modal-body">
                            <label>Hospital</label>
                            <div class="form-group" id="dnombreParent">
                                <input required class="form-control" placeholder="Nombre Hospital" type="text" id="detnombre" readonly name="nombre">
                            </div>
                            <label>Tipo</label>
                            <div class="form-group">
                                <!--<input type="checkbox" data-toggle="toggle" data-on="Publico" data-off="Privado" data-width="100%" name="tipo" id="dettipo">-->
                                <input required class="form-control" type="text"  readonly name="tipo" id="dettipo">
                            </div>
                            <label>Dirección</label>
                            <div class="form-group" id="dcalleParent">
                                <input required class="form-control" type="text" id="detDireccion" readonly name="direccion">
                            </div>
                            <label>Turno</label>
                            <div class="form-group" id="ddepartamentoParent">
                                <select class="form-control" id="turno" required>
                                    <option value="Atencion">Atención</option>
                                    <option value="Vacunacion">Vacunación</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer" style="text-align: center;">
                            <button type="button" class="btn btn-lg btn-successs" id="btnContinuar">Continuar</button>  
                        </div>
                    </form>
                </div>
            </div>
        </div>




        <script src="js/cliente.js"></script>
        <%
            List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales");
            for (Hospital h : hospitales) {%>
        <script>
                        agregarHospital('<%= h.getNombre()%>', <%= h.getLatitud()%>, <%= h.getLongitud()%>);
        </script>
        <%}
        %>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAv3TfTf8HC_onB7FyU3cQ1n8ckH4uE5rs&callback=initMapa" async defer></script>
</html>
