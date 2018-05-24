package Servlets;

import Clases.Cliente;
import Clases.Empleado;
import Clases.HorarioAtencion;
import Clases.Suscripcion;
import Clases.TipoTurno;
import Clases.Usuario;
import Controladores.CCliente;
import Controladores.CCorreo;
import Controladores.CHospital;
import Controladores.CUsuario;
import Controladores.Singleton;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.*;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Date;

@WebServlet(name = "SUsuario", urlPatterns = {"/SUsuario"})
public class SUsuario extends HttpServlet {

    CUsuario cusuario = new CUsuario();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "login":
                    String ci = (request.getParameter("ci") != null) ? request.getParameter("ci") : (String) request.getAttribute("ci");
                    String contrasenia = (request.getParameter("contrasenia") != null) ? request.getParameter("contrasenia") : (String) request.getAttribute("contrasenia");
                    String recordarme = request.getParameter("recordarme");
                    if (ci != null && contrasenia != null) {
                        Usuario u = cusuario.login(ci, contrasenia);
                        if (u != null) {
                            request.getSession().setAttribute("usuario", u);
                            if (recordarme != null) {
                                Cookie userCookie = new Cookie("ci_HospitalWeb", u.getCi());
                                Cookie passCookie = new Cookie("contrasenia_HospitalWeb", u.getContrasenia());
                                userCookie.setMaxAge(60 * 60 * 24 * 365); //Store cookie for 1 year
                                passCookie.setMaxAge(60 * 60 * 24 * 365);
                                response.addCookie(userCookie);
                                response.addCookie(passCookie);
                            }

                            switch (CUsuario.obtenerTipo(u)) {

                                case "General":
                                    request.getRequestDispatcher("/SHospital?Administrador=si").forward(request, response);
                                    break;
                                case "Hospital":
                                    request.getRequestDispatcher("/SUsuario?accion=menuAdmin").forward(request, response);
                                    break;
                                case "Empleado":
                                    request.getRequestDispatcher("/SEmpleado?accion=inicio").forward(request, response);
                                    break;
                                case "Cliente":
                                    request.setAttribute("hospitales", CHospital.obtenerHospitales());
                                    request.getRequestDispatcher("vistas/inicio.jsp").forward(request, response);
                                    break;

                            }
                        } else {
                            request.setAttribute("mensaje_error", "C.I y/o contraseña incorrectos");
                            request.getRequestDispatcher("vistas/login.jsp").forward(request, response);
                        }
                    }
                    break;
                case "logout":
                    request.getSession().removeAttribute("usuario");
                    Cookie userCookie = new Cookie("ci_HospitalWeb", null);
                    Cookie passCookie = new Cookie("contrasenia_HospitalWeb", null);
                    userCookie.setMaxAge(0);
                    passCookie.setMaxAge(0);
                    response.addCookie(userCookie);
                    response.addCookie(passCookie);
                    request.getRequestDispatcher("vistas/login.jsp").forward(request, response);
                    break;
                case "menuAdmin":
                    request.getRequestDispatcher("vistas/adminHospitalMenu.jsp").forward(request, response);
                    break;
                case "altaCliente":
                    String nombre = request.getParameter("nombre");
                    String apellido = request.getParameter("apellido");
                    String ciCliente = request.getParameter("ci");
                    String correo = request.getParameter("email");
                    String digitoVer = request.getParameter("digitoVer");
                    String dia = request.getParameter("dia");
                    String mes = request.getParameter("mes");
                    String anio = request.getParameter("anio");
                    String tels = request.getParameter("telefonos");
                    String departamento = request.getParameter("departamento");
                    String ciudad = request.getParameter("ciudad");
                    String calle = request.getParameter("calle");
                    String numero = request.getParameter("numero");
                    String apart = request.getParameter("apartamento");

                    if (nombre == null || apellido == null || ciCliente == null || correo == null || digitoVer == null || dia == null || mes == null || anio == null || tels == null || departamento == null || ciudad == null || calle == null || numero == null) {
                        response.setContentType("text/plain");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write("Faltan Campos");
                        return;
                    }

                    Usuario u = new Usuario();
                    u.setCi(ciCliente + digitoVer);
                    u.setCorreo(correo);

                    Cliente c = new Cliente();
                    c.setUsuario(u);
                    c.setNombre(nombre);
                    c.setApellido(apellido);
                    c.setDiaNacimiento(Integer.parseInt(dia));
                    c.setMesNacimiento(Integer.parseInt(mes));
                    c.setAnioNacimiento(Integer.parseInt(anio));
                    c.setTelefonos(tels.split("\\|"));
                    c.setDepartamento(departamento.trim());
                    c.setCiudad(ciudad);
                    c.setCalle(calle);
                    c.setNumero(Integer.parseInt(numero));
                    if (apart != null && !apart.equals("")) {
                        c.setApartamento(Integer.parseInt(apart));
                    }

                    String mensaje = "";
                    if (CCliente.altaCliente(c)) {
                        new Thread(new Runnable() {
                            @Override
                            public void run() {
                                CCorreo.enviarContrasenia(c);
                            }
                        }).start();
                        mensaje = "OK";
                    } else {
                        mensaje = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensaje);
                    break;
                case "altaMedico":
                    String nombreMed = request.getParameter("nombre");
                    String apellidoMed = request.getParameter("apellido");
                    String ciClienteMed = request.getParameter("ci");
                    String correoMed = request.getParameter("email");
                    String digitoVerMed = request.getParameter("digitoVer");
                    String diaMed = request.getParameter("dia");
                    String mesMed = request.getParameter("mes");
                    String anioMed = request.getParameter("anio");
                    String telsMed = request.getParameter("telefonos");
                    String especialidades = request.getParameter("especialidades");
                    String departamentoMed = request.getParameter("departamento");
                    String ciudadMed = request.getParameter("ciudad");
                    String calleMed = request.getParameter("calle");
                    String numeroMed = request.getParameter("numero");
                    String apartMed = request.getParameter("apartamento");

                    if (nombreMed == null || apellidoMed == null || ciClienteMed == null || correoMed == null || digitoVerMed == null || diaMed == null || mesMed == null || anioMed == null || telsMed == null || departamentoMed == null || ciudadMed == null || calleMed == null || numeroMed == null) {
                        response.setContentType("text/plain");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write("Faltan Campos");
                        return;
                    }

                    Usuario uMed = new Usuario();
                    uMed.setCi(ciClienteMed + digitoVerMed);
                    uMed.setCorreo(correoMed);

                    Empleado e = new Empleado();
                    e.setUsuario(uMed);
                    e.setNombre(nombreMed);
                    e.setApellido(apellidoMed);
                    e.setDiaNacimiento(Integer.parseInt(diaMed));
                    e.setMesNacimiento(Integer.parseInt(mesMed));
                    e.setAnioNacimiento(Integer.parseInt(anioMed));
                    e.setTelefonos(telsMed.split("\\|"));
                    if (especialidades != null && !especialidades.equals("")) {
                        e.setEspecialidades(especialidades.split("\\|"));

                    }
                    e.setDepartamento(departamentoMed.trim());
                    e.setCiudad(ciudadMed);
                    e.setCalle(calleMed);
                    e.setNumero(Integer.parseInt(numeroMed));
                    if (apartMed != null && !apartMed.equals("")) {
                        e.setApartamento(Integer.parseInt(apartMed));
                    }

                    String mensajeMed = "";
                    // TODO: agregarlo al hospital_cliente
                    if (Singleton.getInstance().persist(e)) {
                        new Thread(new Runnable() {
                            @Override
                            public void run() {
                                CCorreo.enviarContrasenia(e);
                            }
                        }).start();
                        mensajeMed = "OK";
                    } else {
                        mensajeMed = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeMed);
                    break;

                case "reservas":
                    request.setAttribute("hospitales", CHospital.obtenerHospitales());
                    request.getRequestDispatcher("vistas/inicio.jsp").forward(request, response);
                    break;

                case "indicaciones":
                    request.setAttribute("hospitales", CHospital.obtenerHospitales());
                    request.getRequestDispatcher("vistas/indicaciones.jsp").forward(request, response);
                    break;

                case "cliente":
                    request.setAttribute("hospitales", CHospital.obtenerHospitales());
                    request.getRequestDispatcher("vistas/cliente.jsp").forward(request, response);
                    break;

                case "vacunas":
                    request.setAttribute("hospitales", CHospital.obtenerHospitales());
                    request.getRequestDispatcher("vistas/registrarVacuna.jsp").forward(request, response);
                    break;

                case "obtNoHijosCliente":
                    List<Cliente> hCliente = new CCliente().obtenerNoHijosCliente(request.getParameter("idCliente"));
                    String json = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(hCliente);
                    response.setContentType("application/json");
                    response.getWriter().write(json);
                    break;
                case "vincularHijoCliente":
                    String idClientePadre = request.getParameter("idClienteP");
                    String idClienteHijo = request.getParameter("idClienteH");
                    String mensajeVinculo = "";
                    if (CCliente.vincularHijoCliente(idClienteHijo, idClientePadre)) {
                        mensajeVinculo = "OK";
                    } else {
                        mensajeVinculo = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeVinculo);
                    break;
                case "obtClientes": //TODO: Hacer que sean de un hospital especifico
                    String conEmpleados = request.getParameter("conEmpleados");
                    List<Cliente> clientes;
                    if ("si".equals(conEmpleados)) {
                        clientes = CCliente.obtenerClientes();
                    } else {
                        clientes = CCliente.obtenerClientesNoEmpleados();
                    }

                    String clientesJson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(clientes);
                    response.setContentType("application/json");
                    response.getWriter().write(clientesJson);
                    break;
                case "eliminarCliente":
                    String idCliEliminar = request.getParameter("idCliente");
                    String mensajeBajaCliente = "";
                    if (CCliente.bajaCliente(idCliEliminar)) {
                        mensajeBajaCliente = "OK";
                    } else {
                        mensajeBajaCliente = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeBajaCliente);
                    break;
                case "obtEmpleados": //TODO: Hacer que sean de un hospital especifico
                    List<Empleado> empleados = CUsuario.obtenerEmpleados();
                    String empleadosJson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(empleados);
                    response.setContentType("application/json");
                    response.getWriter().write(empleadosJson);
                    break;
                case "eliminarEmpleado":
                    String idEmplEliminar = request.getParameter("idEmpleado");
                    String mensajeBajaEmpleado;
                    if (cusuario.bajaEmpleado(idEmplEliminar)) {
                        mensajeBajaEmpleado = "OK";
                    } else {
                        mensajeBajaEmpleado = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeBajaEmpleado);
                    break;
                case "altaHA":
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");

                    String tipo = request.getParameter("tipo");

                    String[] horaInicio = request.getParameter("horaInicio").split(":");
                    String[] horaFin = request.getParameter("horaFin").split(":");
                    String cant = request.getParameter("cant");

                    Date hi = new Date(0, 0, 0, Integer.valueOf(horaInicio[0]), Integer.valueOf(horaInicio[1]));
                    Date hf = new Date(0, 0, 0, Integer.valueOf(horaFin[0]), Integer.valueOf(horaFin[1]));

                    HorarioAtencion ha = new HorarioAtencion();
                    ha.setDia(request.getParameter("dia"));
                    ha.setHoraInicio(hi);
                    ha.setHoraFin(hf);
                    ha.setTipo(tipo.equals("Atencion") ? TipoTurno.ATENCION : TipoTurno.VACUNACION);
                    ha.setClienteActual(0);
                    ha.setClientesMax(Integer.valueOf(cant));

                    if (CHospital.agregaHorarioAtencion((Usuario) request.getSession().getAttribute("usuario"), Integer.valueOf(request.getParameter("medico")), ha)) {
                        response.getWriter().write("OK");
                    } else {
                        response.getWriter().write("ERR");
                    }
                    break;
                case "verificarCedula":
                    String cedulaVerficar = request.getParameter("cedula");
                    String mensajeVerifCedula;
                    if (cusuario.cedulaExiste(cedulaVerficar)) {
                        mensajeVerifCedula = "OK";
                    } else {
                        mensajeVerifCedula = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeVerifCedula);
                    break;
                case "obtenerHorarioAtencion":
                    response.setContentType("application/json");
                    List<HorarioAtencion> has = CHospital.obtenerHorariosAtencion(Long.valueOf(request.getParameter("idMedico")), (Usuario) request.getSession().getAttribute("usuario"));
                    response.getWriter().write(new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(has));
                    break;
                case "eliminarHA":
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(CHospital.eliminarHorarioAtencion(Integer.valueOf(request.getParameter("idHA"))) ? "OK" : "ERR");
                    break;
                case "passCorrecta":
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(((Usuario) request.getSession().getAttribute("usuario")).getContrasenia().equals(request.getParameter("pass")) ? "OK" : "ERR");
                    break;
                case "cambiarPass":
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(CUsuario.cambiarPass(((Usuario) request.getSession().getAttribute("usuario")).getId(), request.getParameter("pass")) ? "OK" : "ERR");
                    break;
                case "mapaUsuario":
                    request.setAttribute("hospitales", CHospital.obtenerHospitales ());
                    request.getRequestDispatcher("vistas/pantallaUsuarios.jsp").forward (request, response);
                    break;
                case "panelDatos":
                    request.setAttribute("hospitales", CHospital.obtenerHospitales ());
                    request.getRequestDispatcher("vistas/empleado.jsp").forward (request, response);
                case "obtenerSuscripciones":
                    String idUsuarioAdmin = request.getParameter("idUsuarioAdmin");
                    List<Suscripcion> suscripciones = CHospital.obtenerSuscripcionesbyUsuarioAdminHospital(Long.valueOf(idUsuarioAdmin));
                    String suscripcionesJson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(suscripciones);
                    response.setContentType("application/json");
                    response.getWriter().write(suscripcionesJson);
                    break;
            }
        }
    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
