<!DOCTYPE html>
<html>
    <head>
        <jsp:include page="include_css.html"/>
        <title>Perfil</title>

    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>
        <hr>
        <div class="container bootstrap snippet panel">
            <div class="row">
                <div class="col-sm-10"><h1>Nombre Apellido</h1></div>
                <div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="img/default-user2.jpg"></a></div>
            </div>
            <div class="row">
                <div class="col-sm-3"><!--left col-->
                    <ul class="list-group">
                        <li class="list-group-item text-muted">Perfil</li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Nombre</strong></span> Nombre</li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Email</strong></span> ejemplo@gmail.com</li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Telefono</strong></span> 095615165</li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Especialidad</strong></span> Cirujano</li>
                    </ul> 
                </div><!--/col-3-->

                <div class="col-sm-9 col-sm-9 col-md-9 col-lg-9">
                    <ul class="nav nav-tabs" id="myTab">
                        <li class="active" ><a href="#horariosAtencion" data-toggle="tab">Horarios de atención</a></li>
                        <li><a href="#editar" data-toggle="tab">Editar</a></li>
                    </ul>

                    <div class="tab-content">

                        <div class="tab-pane active" id="horariosAtencion">
                            <table class="table">
                                <thead>
                                </thead>
                                <tbody>  
                                    <tr>
                                        <th>Hospital</th>
                                        <th>Fecha</th>
                                        <th>Inicia</th>
                                        <th>Finaliza</th>
                                        <th>Clientes maximos</th>
                                        <th>Cliente actual</th>
                                        <th>Turnos</th>
                                    </tr>
                                    <tr>
                                        <td>H General de Paysandú</td>
                                        <td>12/08/2018</td>
                                        <td>12:30</td>
                                        <td>16:30</td>
                                        <td>20</td>
                                        <td>3</td>
                                        <td><a class="btn btn-info" data-toggle="collapse" data-target="#turnos" href="#turnos">Ver <span class="glyphicon glyphicon-menu-down"></span></a></td>
                                    </tr>
                                    <tr>
                                        <td colspan="7">
                                            <div id="turnos" class="collapse">
                                                <table class="table">
                                                    <thead> 
                                                        <tr><th colspan="3" class="text-center">Turnos</th></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>Tipo</th>
                                                            <th>Numero</th>
                                                            <th>Finalizado</th>
                                                        </tr>
                                                        <tr>
                                                            <td>Atencion</td>
                                                            <td>1</td>
                                                            <td>No</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>     
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="tab-pane" id="editar">
                            <form class="form" action="#" method="post" id="registrationForm">
                                <br>
                                <div class="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="input-group col-md-12">
                                        <span class="input-group-addon">@</span>
                                        <input id="correo" type="text" class="form-control" name="correo" placeholder="Email">
                                    </div>
                                </div>

                                <div class="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="input-group col-md-12">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre">
                                    </div>
                                </div>

                                <div class="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="input-group col-md-12">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input id="apellido" type="text" class="form-control" name="apellido" placeholder="Apellido">
                                    </div>
                                </div>

                                <div class="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="input-group col-md-12">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-phone"></i></span>
                                        <input id="telefono" type="number" class="form-control" name="telefono" placeholder="Teléfono">
                                    </div>
                                </div>

                                <div class="input-group">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <br>
                                        <button class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Guardar</button>
                                        <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Vaciar casillas</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </hr>
        <jsp:include page="include_js.html"/>
    </body>
</html>
