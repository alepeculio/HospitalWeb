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
        
        <script>
            if (!window.location.toString ().includes ("/HospitalWeb/SHospital?Administrador"))
                window.location.assign ("/HospitalWeb/SHospital?Administrador");
        </script>

    </head>
    <body background="img/fondo.png">
        <!-- Header -->
        <jsp:include page="header.jsp"/>

        <div class="fondo mapa">
            <div id="mapa" style="width: 78vw; height: 70vh;"></div>
            <div id="leyenda">
                <h3>Ayuda</h3>
                <img src="img/icono_h.png" class="imgLeyenda"><text>Hospital Registrado</text>
                <p>Click en un hospital registrado para ver su informacion.</p>
                <hr>
                <img src="img/icono_mas.png" class="imgLeyenda"><text>Nuevo Hospital</text>
                <p>Click en alguna parte del mapa para agregar un nuevo hospital, luego click en el boton 'Cargar Hospital'.</p>
            </div>
        </div>
        
        <div id="divBotones" class="fondo boton">
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#modalIngresar" id="btnConfirmar" disabled>Cargar Hospital</button>
        </div>

        <!-- Panel ingresar informacion de nuevo hospital -->
        <div class="modal fade" id="modalIngresar" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Cargar Hospital</h4>
                    </div>
                    <form onsubmit="return false">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Nombre</label>
                                    <div class="form-group" id="nombreParent">
                                        <input required class="form-control" placeholder="Nombre Hospital" type="text" id="nombre" name="nombre">
                                    </div>
                                </div>
                                <div class="col-sm-6" id="directoraParent">
                                    <label>Directora</label>
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Nombre Directora" type="text" id="directora" name="directora">
                                    </div>
                                </div>
                            </div>
                            <label>Tipo</label>
                            <div class="form-group">
                                <input type="checkbox" data-toggle="toggle" data-on="Publico" data-off="Privado" data-width="100%" checked name="tipo" id="tipo">
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Correo Hospital</label>
                                    <div class="form-group" id="correoHospitalParent">
                                        <input required class="form-control" placeholder="Correo Hospital" type="text" id="correo" name="correoHospital">
                                    </div>
                                </div>
                                <div class="col-sm-6" id="telefonoHospitalParent">
                                    <label>Telefono Hospital</label>
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Telefono Hospital" type="text" id="telefono" name="telefonoHospital">
                                    </div>
                                </div>
                            </div>
                            
                            <label>Departamento</label>
                            <div class="form-group" id="departamentoParent">
                                <input required class="form-control" placeholder="Departamento" type="text" id="departamento" name="departamento">
                            </div>
                            <label>Calle</label>
                            <div class="form-group" id="calleParent">
                                <input required class="form-control" placeholder="Calle" type="text" id="calle" name="calle">
                            </div>
                            <label>Nro. Calle</label>
                            <div class="form-group" id="numeroParent">
                                <input required class="form-control" placeholder="Nro. Calle" type="text" id="numero" name="nro">
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
                            <button class="btn btn-success" id="btnIngresarConfirmar">Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Panel detalles hospital -->
        <div class="modal fade" id="modalDetallesHospital" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onsubmit="return false">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <button type="button" class="btn btn-info" data-dismiss="modal" id="btnAdministradore">Administradores</button>
                            <h3 class="modal-title">Informacion Hospital</h3>
                        </div>
                        <div class="modal-body">

                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Nombre</label>
                                    <div class="form-group" id="detnombreParent">
                                        <input required class="form-control" placeholder="Nombre Hospital" type="text" id="detnombre" readonly name="nombre">
                                    </div>
                                </div>
                                <div class="col-sm-6" id="detdirectoraParent">
                                    <label>Directora</label>
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Nombre Directora" type="text" id="detdirectora" name="directora">
                                    </div>
                                </div>
                            </div>
                            
                            <label>Tipo</label>
                            <div class="form-group">
                                <input type="checkbox" data-toggle="toggle" data-on="Publico" data-off="Privado" data-width="100%" name="tipo" id="dettipo">
                            </div>
                            


                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Correo Hospital</label>
                                    <div class="form-group" id="detcorreoHospitalParent">
                                        <input required class="form-control" placeholder="Correo Hospital" type="text" id="detcorreo" name="correoHospital">
                                    </div>
                                </div>
                                <div class="col-sm-6" id="dettelefonoHospitalParent">
                                    <label>Telefono Hospital</label>
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Telefono Hospital" type="text" id="dettelefono" name="telefonoHospital">
                                    </div>
                                </div>
                            </div>
                            
                            <label>Departamento</label>
                            <div class="form-group" id="detdepartamentoParent">
                                <input required class="form-control" placeholder="Departamento" type="text" id="detdepartamento" readonly name="departamento">
                            </div>
                            <label>Calle</label>
                            <div class="form-group" id="detcalleParent">
                                <input required class="form-control" placeholder="Calle" type="text" id="detcalle" readonly name="calle">
                            </div>
                            <label>Nro. Calle</label>
                            <div class="form-group" id="detnumeroParent">
                                <input required class="form-control" placeholder="Nro. Calle" type="text" id="detnumero" readonly name="nro">
                            </div>
                            <label>Posicion</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Latitud" type="text" id="detlat" readonly name="lat">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input required class="form-control" placeholder="Longitud" type="text" id="detlng" readonly name="lng">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger" id="btnBorrarHospital">Borrar Hospital</button>
                            <button class="btn btn-default" id="btnModificarHospital" data-toggle="collapse" data-target="#divBtnConfirmar">Modificar</button>
                            <div id="divBtnConfirmar" class="collapse">
                                <button class="btn btn-success" id="btnModificarConrfirmar">Confirmar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
         
        <!-- Panel Administradores -->
        <div class="modal fade" id="modalAdministradores" role="dialog" style="margin-top: 10vh">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Administradores</h4>
                    </div>
                        <div class="modal-body">
                            <div id="divListadoAdministradores">
                                <p id="msjUsuario">
                                    Click en un administrador para elimminarlo.
                                </p>
                                <label>Administradores</label>
                                <div class="list-group" id="listadoAdministradores">

                                </div>
                            </div>
                    <form onsubmit="return false">
                            <label>C.I.</label>
                            <div class="form-group" id="divCiNuevoAdmin">
                                <input required class="form-control" placeholder="C.I." type="text" id="ciNuevoAdmin" name="ciAdmin">
                            </div>
                            <label>Correo</label>
                            <div class="form-group" id="divCorreoNuevoAdmin">
                                <input required class="form-control" placeholder="Correo" type="text" id="correoNuevoAdmin" name="correoAdmin">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button role="button" class="btn btn-danger" data-dismiss="modal" id="btnCerrarAdministradores">Atras</button>
                            <button class="btn btn-success" id="btnAgregarNuevoAdministradores">Agregar Nuevo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Panel ya existe -->
        <div class="modal fade" id="modalExiste" role="dialog" style="margin-top: 10vh">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Nombre ya existe</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel confirmacion para borrar un administrador -->
        <div class="modal fade" id="modalPregBorrarAdmin" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Eliminar el Administrador?</h2>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-success" data-dismiss="modal" id="btnPregBorrarAdminConfirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel confirmacion para borrar un hospital -->
        <div class="modal fade" id="modalBorrar" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Borrar Hospital?</h2>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-success" data-dismiss="modal" id="btnBorrarConfirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel mensaje borrado con exito -->
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

        <!-- Panel mensaje ingresado con exito -->
        <div class="modal fade" id="modalIngresado" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Hospital Ingresado!</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal" id="btnAceptarIngreso">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel mensaje admin borrado con exito -->
        <div class="modal fade" id="modalAdminBorradoConExito" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Administrador Borrado!</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal" id="btnABCE">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel mensaje admin agregado con exito -->
        <div class="modal fade" id="modalAdministradorIngresadoConExito" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Admin Asignado!</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal" id="btnAceptarAdministradorYaAgregado">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel mensaje admin ya existe -->
        <div class="modal fade" id="modalAdministradorYaExiste" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="msjErrorAgregarAdmin"></h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Panel mensaje modificado con exito -->
        <div class="modal fade" id="modalModificado" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Hospital Modificado!</h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal" id="btnAceptarModificado">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="js/cargaHospital.js"></script>
        <%
        List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales");
        if (hospitales != null)
        for (Hospital h : hospitales) {%>
        <script>
                        agregarHospital('<%= h.getNombre()%>', <%= h.getLatitud()%>, <%= h.getLongitud()%>);
        </script>
        <%}
        %>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1gnU_q4aEtnUkQGKyZbaT--TH76oRL-4&callback=initMapa" async defer></script>
    </body>
</html>
