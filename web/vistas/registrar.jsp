
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="include_css.html"/>
    <jsp:include page="include_js.html"/>
    <title>Registrar Usuario</title>
</head>
<body background="img/fondo.png">
    <jsp:include page="header.jsp"/>
    <div class="container" style="margin-top: 15vh">
        <div class="row">
            <div class="col-sm-5">
                <div class="panel" style="padding: 20px">
                    <h1>
                        Nuevo Usuario
                    </h1>
                </br>
                <form onsubmit="return false">
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
                    <div class="form-group">
                        <label>Fecha nacimiento</label>
                        <div class="row">
                            <div class="col-sm-3">
                                <select class="form-control" id="dia" required>
                                    <option value="">Dia</option>
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

                    <label>Telefonos</label>
                    <div class="form-group" id="tel0" hidden>
                        <div class="input-group">
                            <input required class="form-control telInput" type="text" placeholder="Telefono 1" id="telefono1"/>
                            <span class="input-group-btn">
                                <button class="btn btn-danger telButton" type="button" onclick="quitarTel(1)" disabled>
                                    <span class="glyphicon glyphicon-minus iconoButton"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" onclick="agregarTel()">Agregar campo de telefono <span class="glyphicon glyphicon-plus iconoButton"></span></button>
                </br>
                <label>Direccion</label>
                <select class="form-control" id="departamento" required>
                    <option value="">Departamento</option>
                </select>
            </br>
            <select class="form-control" id="ciudad" required>
                <option value="">Ciudad</option>
            </select>
        </br>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <input required class="form-control" placeholder="Calle" type="text" id="calle">
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <input required class="form-control" placeholder="Nro." type="text" id="numero">
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <input class="form-control" placeholder="Apt." type="text" id="apartamento">
                </div>
            </div>
        </div>
        <div id="opciones" class="collapse">
            <div class="row">
                <div class="col-lg-6">
                    <button type="submit" data-toggle="collapse" data-target="#opciones" class="btn btn-sm btn-success btn-block" id="btnRegistrarUsuario">Confirmar</button>
                </div>
                <div class="col-lg-6">
                    <button type="button" data-toggle="collapse" data-target="#opciones" class="btn btn-sm btn-danger btn-block">Cancelar</button>
                </div>
            </div>
        </br>
    </div>
    <button type="button" data-toggle="collapse" data-target="#opciones" class="btn btn-lg btn-success btn-block">Registrar Usuario</button>
</form>

</div>
</div>
<div class="col-sm-1"></div>
<div class="col-sm-6">
    <div class="panel" style="padding: 20px">
        <h1>
            Ayuda
        </h1>
    </br>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p>
        1) Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p>
        2) Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p>
        3) Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
</div>
</div>
</div>
</div>
<script src="js/registrar.js"></script>
</body>
</html>
