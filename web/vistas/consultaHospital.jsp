<%@page import="Clases.Cliente"%>
<%@page import="Clases.Empleado"%>
<%@page import="java.util.List"%>
<%@page import="Clases.Hospital"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="include_css.html"/>
<jsp:include page="include_js.html"/>
<!DOCTYPE html>
<html>
    <head>

        <link rel="stylesheet" href="css/ConsultaHospital.css" type="text/css">
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="js/yui-min.js"></script>

        <%
            Hospital h = (Hospital) request.getAttribute("hospital");
            List<Empleado> empleados = (List<Empleado>) request.getAttribute("empleados");
            Cliente c = (Cliente) request.getAttribute("cliente");

        %>

    </head>


    <body background="img/fondo.png">


        <div class="vl" style="margin-left: 49%; height:200%; position:absolute;   margin-top: 6%;"></div>
        <!-- Icono Hospital -->
        <div id="margin" >
            <div class="row">
                <img id="Hlogo" src="img/hospital.jpg"  alt="Avatar" style="margin-top: 5%;" >
            </div>
        </div>


        <!-- Hospital-->
        <div id="margin">
            <div class="row"  style="position:relative" >
                <div class="panel panel-default" style="border-color:#1b6d85; max-height:70% ; width: 60%; margin-left: 20% "  >
                    <div class="panel-heading">

                        <a><%=h.getNombre()%></a> </div>

                    <div class="panel-body" id="div2">
                        <h5>Directoro/a: <a class="negrita"> <%=h.getDirectora()%></a></h5>
                        <h5>Direccin: <%=h.getCalle()%>  <%=h.getNumero()%> <a href="SHospital?nombreH=<%=h.getNombre()%>" > Ver En Mapa</a></h5>
                        <h5>Teléfono: <%=h.getTelefono()%> </h5>
                        <h5>Correo electrónico institucional:<a class="negrita" href="mailto:<%=h.getCorreo()%>"><%=h.getCorreo()%></a> </h5> 
                    </div>
                </div>
            </div>
        </div>
        <!-- Doctores-->

        <div id="margin">
            <div class="row">
                <div class="panel panel-default" style="border-color:#1b6d85;  width: 60%; margin-left: 20%"  >
                    <div class="panel-heading">
                        <a>Lista De Doctores</a>
                    </div>
                    <div id="div1">
                        <div class="row" >
                            <% for (Empleado e : empleados) {%>
                            <div class="col-md-4 col-sm-12 " id="doctor" align="center">         
                                <img onclick="mostrarDatosMedico(<%=e.getId()%>)" src="img/doctor  5.png" alt="Avatar" id="foto" >
                                <h4><b onclick="mostrarDatosMedico(<%=e.getId()%>)"><%=e.getNombre()%> <%=e.getApellido()%></b></h4> 
                                <%}%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Vacunas -->

            <div id="margin">
                <div class="panel panel-default" style="border-color:#1b6d85;  width: 60%; margin-left: 20% "  >
                    <div class="panel-heading">
                        <a>Vacunas</a>
                    </div>
                    <div id="div2">
                        <table  class="Tvacuna">                   
                            <tr id="edad">
                                <th style="border-top: hidden; border-left: hidden"></th>
                                <th style="border-top: hidden;border-left: hidden" COLSPAN=7>Edad en meses</th>
                                <th style="border-top: hidden;border-left: hidden; border-right: hidden" COLSPAN=3 >Edad en año</th>
                            </tr>
                            <tr id="numero">
                                <th style="border-left: hidden;border-top: hidden; background-color:white"></th>
                                <th>0</th>
                                <th>2</th>
                                <th>4</th>
                                <th>6</th>
                                <th>12</th>
                                <th>15</th>
                                <th style="border-right-color: #d43f3a" >21</th>
                                <th>5</th>
                                <th>12</th>
                                <th style="border-top-right-radius: 5px">cada 10</th>
                            </tr>
                            <tr>
                                <td style="border-top:#1b6d85 ;">BCG</td>
                                <td id="vacuna" onClick="verificar('BCG-m-0')" value="BCG-m-0" data-toggle="modal"  title="Ir a registrar" ></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Pentavalente</td>
                                <td></td>
                                <td id="vacuna" onClick="verificar('Pentavalente-m-2')" value="Pentavalente-m-2" title="Ir a registrar" ></td>
                                <td id="vacuna"  onclick="" value="Pentavalente-m-4" title="Ir a registrar"></td>
                                <td id="vacuna" onclick="" value="Pentavalente-m-6"title="Ir a registrar"></td>
                                <td></td>
                                <td id="vacuna" data-toggle="modal" data-target="#myModal" value="Pentavalente-m-15" title="Ir a registrar"></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td ></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Polio</td>
                                <td></td>
                                <td id="vacuna"  onclick=""  value="Polio-m-2" title="Ir a registrar"></td>
                                <td id="vacuna"  onclick=""  value="Polio-m-4" title="Ir a registrar"></td>
                                <td id="vacuna"  onclick="" value="Polio-m-6" title="Ir a registrar"></td>
                                <td></td>
                                <td id="vacuna"  onclick="" value="Polio-m-15" title="Ir a registrar"></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>Sarampion</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td id="vacuna" onclick="" value="Sarampion-m-12" title="Ir a registrar"></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td id="vacuna" onclick="" value="Sarampion-a-5" title="Ir a registrar"></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>Rubeola</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td id="vacuna" onclick="" value="Rubeola-m-12"  title="Ir a registrar"></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td id="vacuna"onclick="" value="Rubeola-a-5"  title="Ir a registrar"></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>Paperas</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td id="vacuna" onclick="" value="Paperas-m-12"  title="Ir a registrar"></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td id="vacuna" onclick="" value="Paperas-a-5"  title="Ir a registrar"></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>Varicela</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td id="vacuna" onclick="" value="Varicela-m-12"  title="Ir a registrar"></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td id="vacuna" onclick="" value="Varicela-a-5"  title="Ir a registrar"></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Neumococo 13 V</td>
                                <td></td>
                                <td id="vacuna"  onclick="" value="Neumococo-m-2" title="Ir a registrar"></td>
                                <td id="vacuna" onclick="" value="Neumococo-m-4"  title="Ir a registrar"></td>
                                <td></td>
                                <td  id="vacuna"  onclick=" " value="Neumococo-m-12" title="Ir a registrar"></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Hepatitis A</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td id="vacuna" onclick="" value="Hepatitis-m-15" title="Ir a registrar"></td>
                                <td style="border-right-color: #d43f3a" id="vacuna" onclick="" value="Hepatitis-m-21" title="Ir a registrar"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Triple Bacteriana</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td id="vacuna" onclick="" value="Triple-a-5" title="Ir a registrar"></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>dpaT</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td></td>
                                <td id="vacuna" onclick="" value="dpaT-a-12" title="Ir a registrar"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Doble Bacteriana</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a"></td>
                                <td></td>
                                <td></td>
                                <td  id="vacuna" onclick="" value="Doble-a-10" title="Ir a registrar"></td>
                            </tr>
                            </tr>
                            <tr>
                                <td>HPV*</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="border-right-color: #d43f3a" ></td>
                                <td></td>
                                <td id="vacuna" onclick="" title="Ir a registrar"></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="noHijos" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">	
                            <h4 class="modal-title">Registro Vacuna</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body ">
                            <h3>No tiene hijo/s registrado en el sistema.</h3> 
                            <p>Si usted quiere registrar a su hijo para poder reservar turno de vacunacion dar clic en Registrar Hijo.</p> 
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-default" style="float: left" name="aceptar" >Registrar Hijo</button>
                            <button class="btn btn-default" data-dismiss="modal" name="aceptar" >Salir</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="noEdad" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">	
                            <h4 class="modal-title">Registro Vacuna</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body ">
                            <h3>Edad Incompatible.</h3>
                            <h4>Las vacunas se dan a cierta edad.</h4> 
                            <p>Si usted tiene algun hijo con la edad correcta puede registrar a su hijo haciendo clic en Registrar Hijo.</p>
                            <p>  Luego de registrar su hijo podra reservar un turno para vacunarlo</p> 
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" name="aceptar" >Salir</button>
                            <button type="submit" class="btn btn-default" style="float: left" name="aceptar" >Registrar Hijo</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="correcto" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">	
                            <h4 class="modal-title">Registro Vacuna</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body ">
                            <label>Seleccione el hijo para cual reservara un turno de vacunacion</label>
                            <select class="form-control" id="hijos" required onclick="Shijo()">
                                <option value="">--</option>0
                            </select>
                            <span id="Shijo" hidden style="color: red">Debe seleccionar un hijo</span><br>
                            <label>Seleccione un día para el turno de vacunacion</label>
                            <div class="yui3-skin-sam" align="center">
                                <div id="mycalendar"></div>
                            </div>
                            <span id="Sdia" hidden style="color: red;">Debe seleccionar un dia</span><br>
                            <label>Seleccione un horario disponible.</label>
                            <select class="form-control" id="horarios" onclick="Shorario()" >
                                <option value="">--</option>
                            </select>
                            <span id="Shorario" hidden style="color: red">Debe seleccionar un horario disponible</span><br>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" name="aceptar" style="float: left" >Salir</button>
                            <button class="btn btn-default" id="btnRegistrar" onclick="registrar()" name="aceptar" >Registrar Hijo</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="fin" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">	
                            <h4 class="modal-title">Registro Vacuna</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body ">
                            <h3>Cliente</h3>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>                           
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="trC">
                                    </tr>
                                </tbody>
                            </table>
                            <h3>Doctor Y Horario</h3>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th> 
                                        <th>Hora</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="trD">
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" name="aceptar" >Salir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <jsp:include page="modalDoctor.html"/>
    <jsp:include page="dialogos.html"/>
    <script src="js/consultaHospital.js"></script>
    <script>
                                var hospital = "<%=h.getNombre()%>";
                                var idhospital = <%=h.getId()%>;
    </script>
</html>

