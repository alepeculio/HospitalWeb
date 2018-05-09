
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Registrar Vacuna</title>
        <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    </head>
    <body background="img/fondo.png">

        <div class="container" style="margin-top: 15vh">
            <div class="row">
                <div class="col-sm-5">
                    <div class="panel" style="padding: 20px">
                        <h1>
                            Nueva Fecha de Vacuna
                        </h1>
                        </br>
                        <form onsubmit="return false">
                            <label>Vacuna</label>
                            <select class="form-control" id="departamento" required>
                                <option value="">Vacuna</option>
                            </select>
                            </br>
                            <label>Mes</label>
                            <select class="form-control" id="departamento" required>
                                <option value="">Mes</option>
                            </select>
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
                            <button type="button" data-toggle="collapse" data-target="#opciones" class="btn btn-lg btn-success btn-block">Registrar Vacuna</button>
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
        <script src="bootstrap/jquery-3.3.1.slim.js"></script>
        <script src="bootstrap/jquery-3.3.1.js"></script>
        <script src="bootstrap/bootstrap.js"></script>
        <script src="js/registrar.js"></script>
    </body>
</html>
