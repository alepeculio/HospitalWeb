<%-- 
    Document   : empleado
    Created on : 15/05/2018, 02:15:15 PM
    Author     : Ale
--%>
<%@page import="Clases.EstadoTurno"%>
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
        <script>
            if (!window.location.toString().includes("/HospitalWeb/SEmpleado?accion=inicio"))
                window.location.assign("/HospitalWeb/SEmpleado?accion=inicio");
        </script>

    </head>
    <body background="img/fondo.png">
        <jsp:include page="header.jsp"/>

        <%
            Usuario usuario = (Usuario) request.getSession().getAttribute("usuario");
            Empleado empleado = (Empleado) request.getAttribute("empleado");
        %>

        <ul class="nav nav-pills nav-stacked col-md-3 panel">
            <li class="active"><a href="#horariosAtencion" data-toggle="tab">Horarios de atenciÛn</a></li>
            <hr>
            <li><a href="#datosPersonales" data-toggle="tab" >Datos personales</a></li>
        </ul>

        <div class="panel contenido col-md-8 text-center tab-content">

            <div class="tab-pane active pestania" id="horariosAtencion">
                <h2>Horarios de atenciÛn</h2>
                <hr>
                <table class="table">
                    <thead>
                    </thead>
                    <tbody>  
                        <tr>
                            <th>Hospital</th>
                            <th>DÌa</th>
                            <th>Inicia</th>
                            <th>Finaliza</th>
                            <th>Clientes m·ximos</th>
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
                            <td id="ca<%= ha.getId()%>"><%= ha.getClienteActual()%></td>
                            <td><a class="btn btn-primary" data-toggle="collapse" data-target="#turnos<%=ha.getId()%>">Ver <span class="glyphicon glyphicon-menu-down"></span></a></td>                    
                        </tr>
                        <tr>
                            <td colspan="7">
                                <div id="turnos<%= ha.getId()%>" class="collapse">
                                    <table class="table">
                                        <thead> 
                                            <tr><th colspan="4" class="text-center">Turnos</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th class="text-center">Tipo</th>
                                                <th class="text-center">N˙mero</th>
                                                <th class="text-center">Cliente</th>
                                                <th class="text-center">Estado</th>
                                                <th></th>
                                            </tr>
                                            <% List<Turno> turnos = ha.getTurnos();

                                                if (turnos != null && turnos.size() > 0) {
                                                    for (Turno turno : turnos) {
                                            %>
                                            <tr>
                                                <td><%= turno.getTipo()%></td>
                                                <td><%= turno.getNumero()%></td>
                                                <td><%= turno.getCliente().getNombre() + " " + turno.getCliente().getApellido()%></td>
                                                <td id="estado<%=turno.getId()%>" ><%= turno.getEstado()%></td>
                                                <td>
                                                    <%
                                                        EstadoTurno estado = turno.getEstado();
                                                        if (estado == EstadoTurno.INICIADO) {
                                                            out.println("<button class='btn btn-danger' style='width: 80%' id='btnFinalizado" + turno.getId() + "' onclick='cambiarEstadoTurno(\"" + turno.getId() + "\",\"FINALIZADO\")'>Finalizar <span class='glyphicon glyphicon-stop'></span></button>");
                                                        } else if (estado == EstadoTurno.INGRESADO) {
                                                            out.println("<button class='btn btn-success' style='width: 80%' id='btnIniciado" + turno.getId() + "' onclick='cambiarEstadoTurno(\"" + turno.getId() + "\",\"INICIADO\",\"" + ha.getId() + "\",\"" + turno.getNumero()+ "\")'>Iniciar <span class='glyphicon glyphicon-play'></span></button>"
                                                        
                                                    );
                                                        }
                                                    %> 
                                                </td>
                                            </tr>
                                            <% } %>
                                            <% } else {%>

                                            <tr class="text-center">
                                                <td colspan = "4"> No hay turnos reservados en este Horario de atenciÛn</td>
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
                            <td colspan="7">No tiene horarios de atenci√≥n definidos</td>
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
                        <li class="list-group-item text-right">
                            <%
                                String[] telefonos = empleado.getTelefonos();
                            %>
                            <span class="pull-left"><strong>Tel√©fono<%= telefonos.length <= 2 ? "" : "s"%></strong></span>
                            <ul>
                                <%
                                    if (telefonos != null && telefonos.length != 0) {
                                        for (String t : telefonos) {
                                            out.println("<li>" + t + "</li>");
                                        }
                                    } else {
                                        out.println("-");
                                    }
                                %>
                            </ul>
                        </li>
                        <!--
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Tel√©fonos</strong></span> 
                            
                        </li>-->
                        <li class="list-group-item text-right"><span class="pull-left"><strong>T√≠tulos</strong></span> 
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
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Direcci√≥n</strong></span><% out.println(empleado.getCalle() + " " + empleado.getNumero() + " " + empleado.getApartamento() + " " + empleado.getPiso());%></li>
                    </ul> 


                    <div>
                        <ul class="nav nav-tabs" id="myTab">
                            <li class="active"><a href="#editar" data-toggle="tab">Cambiar Contrase√±a</a></li>
                        </ul>
                        <div class="tab-pane" id="pe">
                            <form onsubmit="return false">
                                <label>Contrase√±a Actual</label>
                                <div class="form-group" id="actualParent">
                                    <input required class="form-control" placeholder="Contrase√±a Actual" type="password" name="nombre" id="passActual">
                                </div>
                                <label>Contrase√±a Nueva</label>
                                <div class="form-group" id="nuevaParent">
                                    <input required class="form-control" placeholder="Contrase√±a Nueva" type="password" name="nombre" id="passNueva">
                                </div>
                                <button class="btn btn-success" id="btnCambiar">Confirmar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="include_js.html"/>
        <jsp:include page="dialogos.html"/>
        <script src="js/empleado.js"></script>
    </body>
</html>
