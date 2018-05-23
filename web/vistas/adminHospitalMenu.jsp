<%@page import="Clases.Cliente"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <jsp:include page="include_css.html"/>
        <link rel="stylesheet" href="styles/adminHospitalMenu.css">

        <title>Menu administrador</title>

        <script>
            if (!window.location.toString().includes("/HospitalWeb/SUsuario?accion=menuAdmin"))
                window.location.assign("/HospitalWeb/SUsuario?accion=menuAdmin");
        </script>
    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>

        <ul class="nav nav-pills nav-stacked col-md-3 panel">

            <li class="active"><a href="#ingresarCliente" data-toggle="tab">Ingresar cliente</a></li>
            <li><a href="#eliminarCliente" data-toggle="tab" onclick="cargarClientes('listCli', 'clienteFila', 'Cli', 'no');">Eliminar cliente</a></li>
            <hr>
            <li><a href="#relacionarHijo" data-toggle="tab" onclick="cargarClientes('listCliP', 'clientePFila', 'CliP', 'si')">Registrar hijo al plan de vacunación</a></li>
            <hr>
            <li><a href="#ingresarMedico" data-toggle="tab">Ingresar médico</a></li>
            <li><a href="#eliminarMedico" data-toggle="tab" onclick ="cargarMedicos('listMedE', 'medicoEFila', 'MedE')">Eliminar médico</a></li>
            <hr>
            <li><a href="#ingresarHA" data-toggle="tab" onclick="cargarMedicos('listMedHA', 'medicoHAFila', 'MedHA')">Agregar horario de atención</a></li>
            <li><a href="#eliminarHA" data-toggle="tab" onclick="cargarMedicos('listMedHAE', 'medicoHAEFila', 'MedHAE')">Eliminar horario de atención</a></li>

        </ul>

        <div class="panel contenido col-md-8 text-center tab-content">

            <div class="tab-pane active pestania" id="ingresarCliente">
                <h2>Ingresar cliente</h2>
                <hr>
                <form onsubmit="return false" id="formIC">
                    <div class="form-group">
                        <input required class="form-control" placeholder="Nombre" type="text" id="nombre">
                        <small id="nombreError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>
                    <div class="form-group">
                        <input required class="form-control" placeholder="Apellido" type="text" id="apellido">
                        <small id="apellidoError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>
                    <div class="form-group">
                        <input required class="form-control" placeholder="E-mail" type="text" id="email">
                        <small id="emailError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>
                    <div class="row">
                        <div class="col-sm-8 form-group">
                            <input required class="form-control" placeholder="C.I. (Sin Guion)" type="text" id="ci">
                            <small id="ciError" class="text-danger" hidden>
                                Error!
                            </small>
                        </div>  
                        <div class="col-sm-4 form-group">
                            <input required class="form-control" placeholder="-" type="text" id="digitoVer">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Fecha de nacimiento</label>
                        <div class="row">
                            <div class="col-sm-3">
                                <select class="form-control" id="dia" required>
                                    <option value="">Día</option>
                                </select>
                            </div>
                            <div class="col-sm-5">
                                <select class="form-control" id="mes" required>
                                    <option value="">Mes</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <select class="form-control" id="anio" required>
                                    <option value="">Año</option>
                                </select>
                            </div>
                        </div>
                        <small id="fechaError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>

                    <label>Teléfonos</label>
                    <div class="form-group" id="tel0" hidden>
                        <div class="input-group">
                            <input required class="form-control telInput" type="number" placeholder="Telefono 1" id="telefono"/>
                            <span class="input-group-btn">
                                <button class="btn btn-danger telButton" type="button" onclick="quitarTel(1)" disabled>
                                    <span class="glyphicon glyphicon-minus iconoButton"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" onclick="agregarTel()">Agregar campo de teléfono <span class="glyphicon glyphicon-plus iconoButton"></span></button>
                    </br>
                    <label>Dirección</label>
                    <select class="form-control" id="departamento" required>
                        <option value="">Departamento</option>
                    </select>
                    <small id="departamentoError" class="text-danger" hidden>
                        Error!
                    </small>
                    </br>
                    <select class="form-control" id="ciudad" required>
                        <option value="">Ciudad</option>
                    </select>
                    <small id="ciudadError" class="text-danger" hidden>
                        Error!
                    </small>
                    </br>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input required class="form-control" placeholder="Calle" type="text" id="calle">
                            </div>
                            <small id="calleError" class="text-danger" hidden>
                                Error!
                            </small>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input required class="form-control" placeholder="Nro." type="number" id="numero">
                            </div>
                            <small id="numeroError" class="text-danger" hidden>
                                Error!
                            </small>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input class="form-control" placeholder="Apt." type="number" id="apartamento">
                            </div>
                        </div>
                    </div>
                    <div id="opciones" class="collapse">
                        <div class="row">
                            <div class="col-lg-6">
                                <button type="submit" data-toggle="collapse" data-target="#opciones" class="btn btn-sm btn-success btn-block" id="btnRegistrarUsuario" onclick="cedulaExiste('Cliente')">Confirmar</button>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" data-toggle="collapse" data-target="#opciones" class="btn btn-sm btn-danger btn-block">Cancelar</button>
                            </div>
                        </div>
                        </br>
                    </div>
                    <button type="button" id="registrarCliente" data-toggle="collapse" data-target="#opciones" class="btn btn-lg btn-success btn-block">Registrar</button>
                </form>
            </div>
            <div class="tab-pane pestania" id="eliminarCliente">
                <h2>Eliminar cliente</h2>
                <hr>
                <label>Seleccione el cliente a eliminar</label>
                <div class="input-group">
                    <input class="form-control" type="text" id="buscarCliInput" onkeyup="buscar('buscarCliInput', 'listCli')" placeholder="Buscar">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                    </span>
                </div><!-- /input-group -->

                <ul class="list-group listCliP" id="listCli">
                    <li class="list-group-item"><a>No hay clientes</a></li>
                </ul>
                <br>
                <button type="button" id="btnEliminarCliente" class="btn btn-lg btn-danger btn-block"><span class="glyphicon glyphicon-bin"></span>Eliminar</button> 
            </div>
            <div class="tab-pane pestania text-center" id="relacionarHijo">
                <h2>Registrar hijo al plan de vacunación</h2>
                <hr>
                <form>
                    <label>Seleccione el cliente</label>
                    <div class="input-group">
                        <input class="form-control" type="text" id="buscarCliPInput" onkeyup="buscar('buscarCliPInput', 'listCliP')" placeholder="Buscar">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                        </span>
                    </div><!-- /input-group -->

                    <ul class="list-group listCliP" id="listCliP">
                        <li class="list-group-item"><a>No hay clientes</a></li>
                    </ul>
                    <br>
                    <label>Seleccione el hijo a ingresar al plan de vacunación</label>
                    <div class="input-group">
                        <input class="form-control" type="text" id="buscarCliHInput" onkeyup="buscar('buscarCliHInput', 'listCliH')" placeholder="Buscar">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                        </span>
                    </div><!-- /input-group -->

                    <ul class="list-group listCliP" id="listCliH">
                        <li class="list-group-item"><a>Elija un cliente padre primero</a></li>
                    </ul>
                    <br>
                    <button type="button" id="btnVincularCliente" class="btn btn-lg btn-success btn-block">Registrar al plan</button> 
                </form>
            </div>
            <div class="tab-pane pestania" id="ingresarMedico">
                <h2>Ingresar médico</h2>
                <hr>
                <form id="formIC2">
                    <div class="form-group">
                        <input required class="form-control" placeholder="Nombre" type="text" id="nombreMed">
                        <small id="nombreMedError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>
                    <div class="form-group">
                        <input required class="form-control" placeholder="Apellido" type="text" id="apellidoMed">
                        <small id="apellidoMedError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>
                    <div class="form-group">
                        <input required class="form-control" placeholder="E-mail" type="text" id="emailMed">
                        <small id="emailMedError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>
                    <div class="row">
                        <div class="col-sm-8 form-group">
                            <input required class="form-control" placeholder="C.I. (Sin Guion)" type="text" id="ciMed">
                            <small id="ciMedError" class="text-danger" hidden>
                                Error!
                            </small>
                        </div>
                        <div class="col-sm-4 form-group">
                            <input required class="form-control" placeholder="-" type="text" id="digitoVerMed">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Fecha de nacimiento</label>
                        <div class="row">
                            <div class="col-sm-3">
                                <select class="form-control" id="diaMed" required>
                                    <option value="">Día</option>
                                </select>
                            </div>
                            <div class="col-sm-5">
                                <select class="form-control" id="mesMed" required>
                                    <option value="">Mes</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <select class="form-control" id="anioMed" required>
                                    <option value="">Año</option>
                                </select>
                            </div>
                        </div>
                        <small id="fechaMedError" class="text-danger" hidden>
                            Error!
                        </small>
                    </div>

                    <label>Teléfonos</label>
                    <div class="form-group" id="telMed0" hidden>
                        <div class="input-group">
                            <input required class="form-control telMedInput" type="number" placeholder="Telefono 1" id="telefonoMed"/>
                            <span class="input-group-btn">
                                <button class="btn btn-danger telMedButton" type="button" onclick="quitarTelMed(1)" disabled>
                                    <span class="glyphicon glyphicon-minus iconoButton"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" onclick="agregarTelMed()">Agregar campo de teléfono <span class="glyphicon glyphicon-plus iconoButton"></span></button>
                    </br>
                    <label>Dirección</label>
                    <select class="form-control" id="departamentoMed" required>
                        <option value="">Departamento</option>
                    </select>
                    <small id="departamentoMedError" class="text-danger" hidden>
                        Error!
                    </small>
                    </br>
                    <select class="form-control" id="ciudadMed" required>
                        <option value="">Ciudad</option>
                    </select>
                    <small id="ciudadMedError" class="text-danger" hidden>
                        Error!
                    </small>
                    </br>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input required class="form-control" placeholder="Calle" type="text" id="calleMed">
                            </div>
                            <small id="calleMedError" class="text-danger" hidden>
                                Error!
                            </small>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input required class="form-control" placeholder="Nro." type="number" id="numeroMed">
                            </div>
                            <small id="numeroMedError" class="text-danger" hidden>
                                Error!
                            </small>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input class="form-control" placeholder="Apt." type="number" id="apartamentoMed">
                            </div>
                        </div>
                    </div>
                    <label >Especialidades</label>
                    <div class="form-group" id="esp0" hidden>
                        <div class="input-group">
                            <input required class="form-control especialidad" type="text" placeholder="Especialidad 1" id="especialidad"/>
                            <span class="input-group-btn">
                                <button class="btn btn-danger especialidadButton" type="button" onclick="quitarEspecialidad(1)">
                                    <span class="glyphicon glyphicon-minus iconoButton"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" onclick="agregarEspecialidad()">Agregar campo de especialidad <span class="glyphicon glyphicon-plus iconoButton"></span></button>
                    <br>
                    <div id="opcionesMed" class="collapse">
                        <div class="row">
                            <div class="col-lg-6">
                                <button type="submit" data-toggle="collapse" data-target="#opcionesMed" class="btn btn-sm btn-success btn-block" id="btnRegistrarMedico" onclick="cedulaExiste('Medico')">Confirmar</button>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" data-toggle="collapse" data-target="#opcionesMed" class="btn btn-sm btn-danger btn-block">Cancelar</button>
                            </div>
                        </div>
                        </br>
                    </div>
                    <button type="button" id="registrarMedico" data-toggle="collapse" data-target="#opcionesMed" class="btn btn-lg btn-success btn-block">Registrar</button>
                </form>
            </div>
            <div class="tab-pane pestania" id="eliminarMedico">
                <h2>Eliminar médico</h2>
                <label>Seleccione el medico a eliminar</label>
                <div class="input-group">
                    <input class="form-control" type="text" id="buscarMedEInput" onkeyup="buscar('buscarMedEInput', 'listMedE')" placeholder="Buscar">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                    </span>
                </div><!-- /input-group -->

                <ul class="list-group listCliP" id="listMedE">
                    <li class="list-group-item"><a>No hay médicos</a></li>
                </ul>
                <br>
                <button type="button" id="btnEliminarMedico" class="btn btn-lg btn-danger btn-block"><span class="glyphicon glyphicon-bin"></span>Eliminar</button> 

            </div>
            <div class="tab-pane pestania" id="ingresarHA">
                <h2>Agregar horario de atención</h2>
                <hr>
                <form onsubmit="return false" id="formHA">
                    <label>Seleccione el médico a asignar el horario</label>
                    <div class="input-group">
                        <input class="form-control" type="text" id="buscarMedHAInput" onkeyup="buscar('buscarMedHAInput', 'listMedHA')" placeholder="Buscar">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                        </span>
                    </div><!-- /input-group -->

                    <ul class="list-group listCliP" id="listMedHA">
                        <li class="list-group-item"><a>No hay médicos</a></li>
                    </ul>
                    <br>

                    <label>Especifique datos del horario</label>
                    <div class="datosHorarioAtencion"></div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-2">
                                <label>Día</label>
                                <select class="form-control" id="haDia" required>
                                    <option value="">--</option>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miercoles">Miercoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sabado">Sabado</option>
                                    <option value="Domingo">Domingo</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Inicio</label>
                                <input class="form-control" type="time" required id="haHoraInicio">
                            </div>
                            <div class="col-sm-3">
                                <label>Fin</label>
                                <input class="form-control" type="time" required id="haHoraFin">
                            </div>
                            <div class="col-sm-2">
                                <label>Pacientes</label>
                                <input class="form-control" type="number" required id="haCant">
                            </div>
                            
                            <div class="col-sm-2">
                                <label>Tipo</label>
                                <select class="form-control" id="haTipo" required>
                                    <option value="">--</option>
                                    <option value="Atencion">Atención</option>
                                    <option value="Vacunacion">Vacunación</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button  id="btnIngresarHA" class="btn btn-lg btn-success btn-block datosHorarioAtencion">Agregar</button>
                </form>

            </div>
            <div class="tab-pane pestania" id="eliminarHA">
                <h2>Eliminar horario de atención</h2>
                <hr>
                <label>Seleccione el médico a eliminar el horario</label>
                <div class="input-group">
                    <input class="form-control" type="text" id="buscarMedHAEInput" onkeyup="buscar('buscarMedHAEInput', 'listMedHAE')" placeholder="Buscar">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                    </span>
                </div><!-- /input-group -->

                <ul class="list-group listCliP" id="listMedHAE">
                    <li class="list-group-item"><a>No hay médicos</a></li>
                </ul>
                <br>
                <div class="datosHorarioAtencion"></div>
                <label>Horarios de atención</label>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="tablaHA">Día</th>
                            <th class="tablaHA">Inicio</th>
                            <th class="tablaHA">Fin</th>
                            <th class="tablaHA">Pacientes</th>
                            <th class="tablaHA">Tipo</th>
                            <th class="tablaHA">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody id="listaHA">
                        <tr class="tablaHA" id="ha0" hidden>
                            <td class="haDia">Lunes</td>
                            <td class="haHI">23:00</td>
                            <td class="haHF">08:00</td>
                            <td class="haCant">23</td>
                            <td class="haTipo">Atención</td>
                            <td><button class="btn btn-danger haBoton"><span class="glyphicon glyphicon-remove"></span></button></td>
                        </tr>
                    </tbody>
                </table>
                <div id="mensajeNoHay">
                    Seleccione un medico
                </div>
            </div>
        </div>

        <!--Notificacion de ingresar usuario -->
        <div class="modal fade" id="modalIngresarUsuario" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="modalIUMensaje"></h4>
                    </div>
                    <div class="modal-footer centrarIUBoton">
                        <button class="btn btn-info" data-dismiss="modal" id="btnPregBorrarAdminConfirmar">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

        <jsp:include page="dialogos.html"/>
        <jsp:include page="include_js.html"/>
        <script src="js/adminHospitalMenu.js"></script>
    </body>
</html>
