<%-- 
    Document   : empleado
    Created on : 15/05/2018, 02:15:15 PM
    Author     : Ale
--%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page import="Clases.Turno"%>
<%@page import="java.util.List"%>
<%@page import="Clases.HorarioAtencion"%>
<%@page import="Clases.Usuario"%>
<%@page import="Clases.Empleado"%>
<%@page import="Clases.Cliente"%>
<%@page import="java.util.*" %>
<!DOCTYPE html>
<html>
    <head>
        <jsp:include page="include_css.html"/>
        <link rel="stylesheet" href="styles/empleado.css">

        <title>Perfil</title>

    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>

        <%
            Usuario usuario = (Usuario) request.getSession().getAttribute("usuario");
            Empleado empleado = (Empleado) request.getAttribute("empleado");
        %>

        <ul class="nav nav-pills nav-stacked col-md-3 panel">
            <li class="active"><a href="#horariosAtencion" data-toggle="tab">Horarios de atención</a></li>
            <hr>
            <li><a href="#datosPersonales" data-toggle="tab" >Datos personales</a></li>
        </ul>

        <div class="panel contenido col-md-8 text-center tab-content">

            <div class="tab-pane active pestania" id="horariosAtencion">
                <h2>Horarios de atención</h2>
                <hr>
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
                            <td><%= ha.getHospital().getNombre()%></td>
                            <td><%= ha.getDia()%></td>
                            <td><%= new SimpleDateFormat("hh:mm").format(ha.getHoraInicio())%></td>
                            <td><%= new SimpleDateFormat("hh:mm").format(ha.getHoraFin())%></td>
                            <td><%= ha.getClientesMax()%></td>
                            <td><%= ha.getClienteActual()%></td>
                            <td><a class="btn btn-info" data-toggle="collapse" data-target="#turnos<%=ha.getId()%>" href="#turnos">Ver <span class="glyphicon glyphicon-menu-down"></span></a></td>
                        </tr>
                        <tr>
                            <td colspan="7">
                                <div id="turnos<%=ha.getId()%>" class="collapse">
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
                                                    for (Turno turno : turnos) {
                                            %>
                                            <tr>
                                                <td><%= turno.getTipo()%></td>
                                                <td><%= turno.getNumero()%></td>
                                                <td><%= (turno.isFinalizado()) ? "Si" : "No <button class='btn btn-danger'>Finalizar</button>"%></td>
                                            </tr>

                                            <%}
                                            } else { %>

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


            <div class="tab-pane pestania" id="datosPersonales">
                <h2>Datos personales</h2>
                <hr>
                <div>
                    <ul class="list-group">
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Nombre completo</strong></span><%= empleado.getNombre()%> <%= empleado.getApellido()%></li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Email</strong></span><%= usuario.getCorreo()%></li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Teléfonos</strong></span> 
                            <%
                                String[] telefonos = empleado.getTelefonos();
                                if (telefonos != null && telefonos.length != 0) {
                                    for (String t : telefonos) {
                                        out.println(" " + t + " | ");
                                    }
                                    out.println(telefonos[0]);
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


                    <div>
                        <ul class="nav nav-tabs" id="myTab">
                            <li><a href="#editar" data-toggle="tab">Editar</a></li>
                        </ul>

                        <div class="tab-content">

                            <div class="tab-pane active" id="editar">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="include_js.html"/>
    </body>
</html>
