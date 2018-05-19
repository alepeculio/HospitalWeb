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

        <!-- Movido para arriba para poder utilizar funciones antes de que termine de cargar la pagina-->
        <jsp:include page="include_js.html"/>
        <jsp:include page="modalDoctor.html"/>
        <jsp:include page="dialogos.html"/>
        <script src="js/empleado.js"></script>

        <title>Inicio</title>
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
                            <th>Día</th>
                            <th>Inicia</th>
                            <th>Finaliza</th>
                            <th>Clientes máximos</th>
                            <th>Cliente actual</th>
                            <th>Tipo</th>
                            <th>Turnos</th>
                            <th>Estado</th>
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
                            <td id="ca<%= ha.getId()%>"><%if (ha.getClienteActual() == 0) {
                                    out.println("-");
                                    out.println("<script type='text/javascript'> setTurnoActual('" + ha.getId() + "','');</script>");
                                } else {
                                    out.println(ha.getClienteActual());
                                    for (Turno t : ha.getTurnos()) {
                                        if (t.getNumero() == ha.getClienteActual()) {
                                            out.println("<script type='text/javascript'>setTurnoActual('" + ha.getId() + "','" + t.getId() + "');</script>");
                                        }
                                    }
                                }%></td>
                            <td><%= ha.getTipo().toString().toLowerCase()%></td>
                            <td><a class="btn btn-primary" data-toggle="collapse" data-target="#turnos<%=ha.getId()%>">Ver <span class="glyphicon glyphicon-menu-down"></span></a></td>                    
                            <td id="estadoHA<%= ha.getId()%>">
                                <%
                                    if (ha.getEstado().equals(EstadoTurno.INICIADO)) {
                                        out.println("<button class ='btn btn-danger' onclick='pregunta(\"&#191;Est&aacute; seguro que desea finalizar el horario de atenci&oacute;n&#63;,<br> todos sus turnos tambi&eacute;n finalizar&aacute;n.\",\"finalizarHA\",\"" + ha.getId() + "\")'>Finalizar <span class='glyphicon glyphicon-stop'></span></button>");
                                    } else if (ha.getEstado().equals(EstadoTurno.PENDIENTE)) {
                                        out.println("<span class='glyphicon glyphicon-hourglass' title='Pendiente'></span>");
                                    } else {
                                        out.println("<span class='glyphicon glyphicon-ok' title='Finalizado' style='color:green;'></span>");

                                    }
                                %>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="9">
                                <div id="turnos<%= ha.getId()%>" class="collapse">
                                    <table class="table">
                                        <thead> 
                                            <tr><th colspan="3" class="text-center">Turnos</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th class="text-center">Número</th>
                                                <th class="text-center">Cliente</th>
                                                <th class="text-center">Estado</th>
                                                <th></th>
                                            </tr>
                                            <% List<Turno> turnos = ha.getTurnos();

                                                if (turnos != null && turnos.size() > 0) {
                                                    for (Turno turno : turnos) {
                                            %>
                                            <tr>
                                                <td><%= turno.getNumero()%></td>  
                                                <td><%= turno.getCliente().getNombre() + " " + turno.getCliente().getApellido()%></td>
                                                <td id="estado<%=turno.getId()%>" >
                                                    <%
                                                        if (turno.getEstado().equals(EstadoTurno.INICIADO)) {
                                                            out.println("<span class='glyphicon glyphicon-play' title='Iniciado'></span>");
                                                        } else if (turno.getEstado().equals(EstadoTurno.PENDIENTE)) {
                                                            out.println("<span class='glyphicon glyphicon-hourglass' title='Pendiente'></span>");
                                                        } else {
                                                            out.println("<span class='glyphicon glyphicon-ok' title='Finalizado' style='color:green;'></span>");

                                                        }
                                                    %>
                                                </td>
                                                <td id="btnEstado">
                                                    <%
                                                        EstadoTurno estado = turno.getEstado();
                                                        if (estado == EstadoTurno.INICIADO) {
                                                            out.println("<button class='btn btn-danger' id='btnFinalizado" + turno.getId() + "' onclick='actualizarHA(\"" + turno.getId() + "\",\"FINALIZADO\",\"" + ha.getId() + "\",\"" + turno.getNumero() + "\")'>Finalizar <span class='glyphicon glyphicon-stop'></span></button>");
                                                        } else if (estado == EstadoTurno.PENDIENTE) {
                                                            out.println("<button class='btn btn-success' id='btnIniciado" + turno.getId() + "' onclick='actualizarHA(\"" + turno.getId() + "\",\"INICIADO\",\"" + ha.getId() + "\",\"" + turno.getNumero() + "\")'>Iniciar <span class='glyphicon glyphicon-play'></span></button>"
                                                            );
                                                        }
                                                    %> 
                                                </td>
                                            </tr>
                                            <% } %>
                                            <% } else {%>
                                            <tr class="text-center">
                                                <td colspan = "4"> No hay turnos reservados en este Horario de atención</td>
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
                            <td colspan="9">No tiene horarios de atención definidos</td>
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
                            <span class="pull-left"><strong>Teléfono<%= telefonos.length > 1 ? "s" : ""%></strong></span>
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
                        <li class="list-group-item text-right">
                            <%
                                String[] especialidades = empleado.getEspecialidades();
                            %>
                            <span class="pull-left"><strong>Especialidad<%= especialidades != null && especialidades.length > 1 ? "es" : "" %></strong></span>
                            <ul>
                                <%
                                    if (especialidades != null && especialidades.length != 0) {
                                        for (String t : especialidades) {
                                            out.println("<li>" + t + "</li>");
                                        }
                                    } else {
                                        out.println("-");
                                    }
                                %>
                            </ul>
                        </li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Fecha de nacimiento</strong></span><% out.println(empleado.getDiaNacimiento() + "/" + empleado.getMesNacimiento() + "/" + empleado.getAnioNacimiento());%></li>
                        <li class="list-group-item text-right"><span class="pull-left"><strong>Dirección</strong></span><% out.println(empleado.getCalle() + " " + empleado.getNumero() + " " + empleado.getApartamento());%></li>
                    </ul>


                    <div>
                        <ul class="nav nav-tabs" id="myTab">
                            <li class="active"><a href="#editar" data-toggle="tab">Cambiar Contraseña</a></li>
                        </ul>
                        <div class="tab-pane" id="pe">
                            <form onsubmit="return false">
                                <label>Contraseña Actual</label>
                                <div class="form-group" id="actualParent">
                                    <input required class="form-control" placeholder="Contraseña Actual" type="password" name="nombre" id="passActual">
                                </div>
                                <label>Contraseña Nueva</label>
                                <div class="form-group" id="nuevaParent">
                                    <input required class="form-control" placeholder="Contraseña Nueva" type="password" name="nombre" id="passNueva">
                                </div>
                                <button class="btn btn-success" id="btnCambiar">Confirmar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
