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
         <!-- Header -->
         <jsp:include page="header.jsp"/>
         
        <div class="fondo mapa">
            <div id="mapa" style="width: 78vw; height: 70vh;"></div>
            <div id="leyenda">
                <h3>Leyenda</h3>
                <img src="img/icono_h.png" class="imgLeyenda"><text>Hospital Registrado</text>
                <p>Click en un hospital registrado para borrarlo.</p>
                <hr>
                <img src="img/icono_mas.png" class="imgLeyenda"><text>Nuevo Hospital</text>
                <p>Click en alguna parte del mapa para agregar un nuevo hospital, luego click en el boton 'Cargar Hospital'.</p>
            </div>
        </div>
        
        <!-- Panel confirmacion para borrar un hospital -->
        <div class="modal fade" id="modalBorrar" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Borrar Hospital?</h4>
                    </div>
                    <div class="modal-body">
                        <h2 id="borrarNombre">Nombre</h2>
                        <h3 id="borrarDireccion">Direcion</h3>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-success" data-dismiss="modal" id="btnBorrarConfirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel mensaje de borrado con exito -->
        <div class="modal fade" id="modalBorrado" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Hospital Borrado</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" id="btnBorrado">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel mensaje de ingresado con exito -->
        <div class="modal fade" id="modalIngresado" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Hospital Ingresado!</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="fondo boton">
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#modalIngresar" id="btnConfirmar" disabled>Cargar Hospital</button>
        </div>
        
        <!-- Panel ingresar informacion de nuevo hospital -->
        <div class="modal fade" id="modalIngresar" role="dialog">
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
        <%
        if (request.getAttribute ("ingresado") != null) {
            %>
            <script>
                $("#modalIngresado").modal ("show");
            </script>
        <%
        }
        %>
    </body>
</html>