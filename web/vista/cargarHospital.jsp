<%@page import="java.util.List"%>
<%@page import="Clases.Hospital"%>
<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <jsp:include page="include_css.html"/>
        <jsp:include page="include_js.html"/>
        <title>Registrar Usuario</title>
        <link rel="stylesheet" href="styles/cargaHospital.css">
        
    </head>
    <body background="img/fondo.png">
        <div class="fondo mapa">
            <div id="mapa" style="width: 78vw; height: 70vh;"></div>
        </div>
        
        <div class="fondo boton">
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" id="btnConfirmar" disabled>Cargar Hospital</button>
        </div>
        
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Cargar Hospital</h4>
                    </div>
                    <form method="POST" action="SHospital?ingresarNuevo">
                        <div class="modal-body">
                            <label>Nombre</label>
                            <div class="form-group">
                                <input required class="form-control" placeholder="Nombre Hospital" type="text" id="nombre" name="nombre">
                                <small id="nombreError" class="text-danger" hidden>
                                    Error!
                                </small>
                            </div>
                            <label>Tipo</label>
                                <div class="form-group">
                                    <input type="checkbox" data-toggle="toggle" data-on="Publico" data-off="Privado" data-width="100%" checked name="tipo">
                                </div>
                            <label>Departamento</label>
                            <div class="form-group">
                                <input required class="form-control" placeholder="Departamento" type="text" id="departamento" name="departamento">
                                <small id="departamentoError" class="text-danger" hidden>
                                    Error!
                                </small>
                            </div>
                            <label>Calle</label>
                            <div class="form-group">
                                <input required class="form-control" placeholder="Calle" type="text" id="calle" name="calle">
                                <small id="calleError" class="text-danger" hidden>
                                    Error!
                                </small>
                            </div>
                            <label>Nro. Calle</label>
                            <div class="form-group">
                                <input required class="form-control" placeholder="Nro. Calle" type="text" id="numero" name="nro">
                                <small id="numeroError" class="text-danger" hidden>
                                    Error!
                                </small>
                            </div>
                            <label>Posicion</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Latitud" type="text" id="lat" readonly name="lat">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Longitud" type="text" id="lng" readonly name="lng">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success">Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <script src="js/cargaHospital.js"></script>
        <%
        List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales");
        for (Hospital h : hospitales) {%>
        <script>
            agregarHospital ('<%= h.getNombre()%>', <%= h.getLatitud()%>, <%= h.getLongitud()%>);
        </script>
        <%}
        %>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAv3TfTf8HC_onB7FyU3cQ1n8ckH4uE5rs&callback=initMapa" async defer></script>
    </body>
</html>