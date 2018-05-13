/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import Clases.Cliente;
import Clases.Empleado;
import Clases.Usuario;
import Controladores.CCliente;
import Controladores.CHospital;
import Controladores.CUsuario;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 *
 * @author Ale
 */
@WebServlet(name = "SUsuario", urlPatterns = {"/SUsuario"})
public class SUsuario extends HttpServlet {

    CUsuario cusuario = new CUsuario();

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
                                default:
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
                    request.getSession().removeAttribute("ci");
                    Cookie userCookie = new Cookie("ci_HospitalWeb", null);
                    Cookie passCookie = new Cookie("contrasenia_HospitalWeb", null);
                    userCookie.setMaxAge(0);
                    passCookie.setMaxAge(0);
                    response.addCookie(userCookie);
                    response.addCookie(passCookie);
                    request.getRequestDispatcher("vistas/login.jsp").forward(request, response);
                    break;
                case "perfil":
                    Empleado empleado = (new CUsuario()).getEmpleado(((Usuario) request.getSession().getAttribute("usuario")).getId());
                    request.setAttribute("empleado", empleado);
                    request.getRequestDispatcher("vistas/perfil.jsp").forward(request, response);
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
                    if (CCliente.altaCliente(e)) {
                        mensajeMed = "OK";
                    } else {
                        mensajeMed = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeMed);
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

                case "registrar":
                    //request.setAttribute("hospitales", CHospital.obtenerHospitales());
                    request.getRequestDispatcher("vistas/registrar.jsp").forward(request, response);
                    break;
                case "obtNoHijosCliente":
                    List<Cliente> hCliente = CCliente.obtenerNoHijosCliente(request.getParameter("idCliente"));
                    String json = new Gson().toJson(hCliente);
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
                case "obtClientes":
                    List<Cliente> clientes = CCliente.obtenerClientes();
                    String clientesJson = new Gson().toJson(clientes);
                    response.setContentType("application/json");
                    response.getWriter().write(clientesJson);
                    break;
                case "eliminarCliente":
                    String idCliEliminar = request.getParameter("idCliente");
                    Cliente cliente = new Cliente();
                    cliente.setId(Long.valueOf(idCliEliminar));
                    String mensajeBajaCliente = "";
                    if (CCliente.bajaCliente(cliente)) {
                        mensajeBajaCliente = "OK";
                    } else {
                        mensajeBajaCliente = "ERR";
                    }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(mensajeBajaCliente);
                    break;
                    case "obtEmpleados":
                    List<Empleado> empleados = cusuario.obtenerEmpleados();
                    String empleadosJson = new Gson().toJson(empleados);
                    response.setContentType("application/json");
                    response.getWriter().write(empleadosJson);
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
