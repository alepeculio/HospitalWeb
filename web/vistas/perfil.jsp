<%@page import="Clases.Turno"%>
<%@page import="java.util.List"%>
<%@page import="Clases.HorarioAtencion"%>
<%@page import="Clases.Usuario"%>
<%@page import="Clases.Empleado"%>
<%@page import="Clases.Cliente"%>
<!DOCTYPE html>
<html>
    <head>
        <jsp:include page="include_css.html"/>
        <title>Perfil</title>

    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>
        <hr>

        <%
            Usuario usuario = (Usuario) request.getSession().getAttribute("usuario");
            Empleado empleado = (Empleado) request.getAttribute("empleado");
        %>

        <div class="container bootstrap snippet panel">
            <div class="row">
                <div class="col-sm-10"><h1><%= empleado.getNombre()%></h1></div>
                <div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="img/default-user2.jpg"></a></div>
            </div>
            <div class="row">
                <div class="col-sm-4"><!--left col-->
                    <ul class="list-group">
                        <li class="list-group-item text-muted">Perfil</li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Nombre completo</strong></span><%= empleado.getNombre()%> <%= empleado.getApellido()%></li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Email</strong></span><%= usuario.getCorreo()%></li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Teléfonos</strong></span> 
                            <%
                                String[] telefonos = empleado.getTelefonos();
                                if (telefonos != null) {
                                    for (String t : telefonos) {
                                        out.println(" " + t + " ");
                                    }
                                } else {
                                    out.println("-");
                                }
                            %>
                        </li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Títulos</strong></span> 
                            <%
                                String[] titulos = empleado.getTitulos();
                                if (titulos != null) {
                                    for (String ti : titulos) {
                                        out.println(" " + ti + " ");
                                    }
                                } else {
                                    out.println("-");
                                }
                            %>
                        </li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Especialidades</strong></span>
                            <%
                                String[] especialidades = empleado.getEspecialidades();
                                if (especialidades != null) {
                                    for (String e : especialidades) {
                                        out.println(" " + e + " ");
                                    }
                                } else {
                                    out.println("-");
                                }
                            %>
                        </li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Fecha de nacimiento</strong></span><% out.println(empleado.getDiaNacimiento() + "/" + empleado.getMesNacimiento() + "/" + empleado.getAnioNacimiento());%></li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Dirección</strong></span><% out.println(empleado.getCalle() + " " + empleado.getNumero() + " " + empleado.getApartamento() + " " + empleado.getPiso());%></li>
                    </ul> 
                </div><!--/col-3-->

                <div class="col-sm-8 col-sm-8 col-md-8 col-lg-8">
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
                                        <th>Dia</th>
                                        <th>Inicia</th>
                                        <th>Finaliza</th>
                                        <th>Clientes maximos</th>
                                        <th>Cliente actual</th>
                                        <th>Turnos</th>
                                    </tr>

                                    <% List<HorarioAtencion> hsa = empleado.getHorariosAtencions();
                                        if (hsa != null && hsa.size() > 0) {
                                            for (HorarioAtencion ha : hsa) {%>
                                    <tr>
                                        <td><%--<%= ha.getHospital().getNombre() %>--%></td>
                                        <td><%= ha.getDia()%></td>
                                        <td><% out.println(ha.getHoraInicio() + ":" + ha.getMinInicio()); %></td>
                                        <td><% out.println(ha.getHoraFin() + ":" + ha.getMinFin());%></td>
                                        <td><%= ha.getClientesMax()%></td>
                                        <td><%= ha.getClienteActual()%></td>
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
                                                        <% List<Turno> turnos = ha.getTurnos();

                                                            if (turnos != null && turnos.size() > 0) {
                                                                for(Turno turno : turnos){
                                                        %>
                                                        <tr>
                                                            <td><%= turno.getTipo() %></td>
                                                            <td><%= turno.getNumero() %></td>
                                                            <td><%= (turno.isFinalizado())? "Si" : "No <button class='btn btn-danger'>Finalizar</button>" %></td>
                                                        </tr>

                                                        <%}} else { %>

                                                        <tr class="text-center">
                                                            <td colspan = "3"> No hay turnos reservados en este Horario de atención</td>
                                                        </tr>
                                                           <% }%>
                                                    </tbody>
                                                </table>
                                            </div>     
                                        </td>
                                    </tr> <!-- Hasta aca por Horario -->
                                    <%}
                                    } else {%>
                                    <tr>
                                        <td colspan="7">No tiene horarios de atención definidos</td>
                                    </tr> 
                                    <%}%>
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
