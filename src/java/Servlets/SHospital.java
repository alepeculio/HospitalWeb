package Servlets;

import Clases.Cliente;
import Clases.Empleado;
import Clases.EstadoTurno;
import Clases.HorarioAtencion;
import Clases.Hospital;
import Clases.TipoTurno;
import Clases.Turno;
import Clases.Usuario;
import Controladores.CCliente;
import Controladores.CCorreo;
import Controladores.CHospital;
import Controladores.CUsuario;
import Controladores.Singleton;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Jorge
 */
@WebServlet(name = "SHospital", urlPatterns = {"/SHospital"})
public class SHospital extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        if (request.getParameter("Administrador") != null) {
            request.setAttribute("hospitales", CHospital.obtenerHospitales());
            request.getRequestDispatcher("vistas/cargarHospital.jsp").forward(request, response);
        } else if (request.getParameter("verHospital") != null) {
            Hospital h = CHospital.obtenerHospital(URLDecoder.decode(request.getParameter("verHospital"), "UTF-8"));
            request.setAttribute("hospital", h);
            List<Empleado> emps = h.getEmpleados ();
            Cliente c = CCliente.getClientebyUsuario(((Usuario) request.getSession().getAttribute("usuario")).getId());
            request.setAttribute("empleados", emps);
            request.setAttribute("cliente", c);
            request.getRequestDispatcher("vistas/consultaHospital.jsp").forward(request, response);
        } else if (request.getParameter("Vacuna") != null) {
            request.setAttribute("vacuna", "vacuna");
            request.setAttribute("hospital", "hospital");
            request.getRequestDispatcher("vistas/registroVacuna.jsp").forward(request, response);
        } else if (request.getParameter("nombreH") != null) {
            request.setAttribute("hospitales", CHospital.obtenerHospitales ());
            request.setAttribute("verMapa", request.getParameter("nombreH"));
            request.getRequestDispatcher("vistas/indicaciones.jsp").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    private void checkearAdmin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Usuario u = (Usuario) request.getSession().getAttribute("usuario");
        if (u != null && CUsuario.obtenerTipo(u).equals("General")) {
            request.setAttribute("hospitales", CHospital.obtenerHospitales());
            request.getRequestDispatcher("vistas/cargarHospital.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("/SInicio").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("Administrador") != null) {
            checkearAdmin(request, response);
        } else if (request.getParameter("ingresarNuevo") != null) {
            Hospital h = new Hospital();
            h.setNombre(URLDecoder.decode(request.getParameter("nombre"), "UTF-8"));
            h.setDirectora(URLDecoder.decode(request.getParameter("directora"), "UTF-8"));
            h.setPublico(request.getParameter("tipo").equals("on"));
            h.setCorreo(URLDecoder.decode(request.getParameter("correo"), "UTF-8"));
            h.setTelefono(URLDecoder.decode(request.getParameter("telefono"), "UTF-8"));
            h.setDepartamento(URLDecoder.decode(request.getParameter("departamento"), "UTF-8"));
            h.setCalle(URLDecoder.decode(request.getParameter("calle"), "UTF-8"));
            h.setNumero(Integer.valueOf(request.getParameter("nro")));
            h.setLatitud(Double.valueOf(request.getParameter("lat")));
            h.setLongitud(Double.valueOf(request.getParameter("lng")));
            Singleton.getInstance().persist(h);
            request.setAttribute("hospitales", CHospital.obtenerHospitales());
            request.getRequestDispatcher("vistas/cargarHospital.jsp").forward(request, response);
        } else if (request.getParameter("nombre") != null) {
            CHospital.borrarHospital(request.getParameter("nombre"));
        } else if (request.getParameter("existe") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(CHospital.obtenerHospital(request.getParameter("existe")) == null ? "no" : "si");
        } else if (request.getParameter("obtener") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");

            Hospital h = CHospital.obtenerHospital(request.getParameter("obtener"));
            if (h != null) {
                response.getWriter().write(String.format("%s#%s#%s#%s#%s#%s#%s#%s#%s#%s", h.getNombre(), h.isPublico() ? "on" : "off", h.getDepartamento(), h.getCalle(), h.getNumero(), h.getLatitud(), h.getLongitud(), h.getDirectora(), h.getCorreo(), h.getTelefono()));
            } else {
                response.getWriter().write("NOPE");
            }
        } else if (request.getParameter("obtenerHorarios") != null) {

            String hospital = request.getParameter("obtenerHorarios");
            String dia = request.getParameter("dia");
            Usuario u = (Usuario) request.getSession().getAttribute("usuario");
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");

            String s = CHospital.agregarTurno(hospital, u.getId(), dia);

            response.getWriter().write(s);

        } else if (request.getParameter("modificar") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");

            if (!request.getParameter("nuevo_nombre").equals(request.getParameter("viejo_nombre"))) {
                if (CHospital.obtenerHospital(request.getParameter("nuevo_nombre")) != null) {
                    response.getWriter().write("existe");
                    return;
                }
            }

            Hospital h = new Hospital();
            h.setNombre(URLDecoder.decode(request.getParameter("nuevo_nombre"), "UTF-8"));
            h.setDirectora(URLDecoder.decode(request.getParameter("directora"), "UTF-8"));
            h.setPublico(request.getParameter("tipo").equals("on"));
            h.setCorreo(URLDecoder.decode(request.getParameter("correo"), "UTF-8"));
            h.setTelefono(URLDecoder.decode(request.getParameter("telefono"), "UTF-8"));
            h.setDepartamento(URLDecoder.decode(request.getParameter("departamento"), "UTF-8"));
            h.setCalle(URLDecoder.decode(request.getParameter("calle"), "UTF-8"));
            h.setNumero(Integer.valueOf(request.getParameter("nro")));
            h.setLatitud(Double.valueOf(request.getParameter("lat")));
            h.setLongitud(Double.valueOf(request.getParameter("lng")));

            CHospital.modificarHospital(request.getParameter("viejo_nombre"), h);

            response.getWriter().write("modificado");
        } else if (request.getParameter("obtenerAdministradores") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");

            List<Usuario> usuarios = CHospital.obtenerAdministradoresHospital(request.getParameter("nomHospital"));

            if (usuarios == null) {
                response.getWriter().write("NOPE");
            } else {
                String data = "";

                for (int i = 0; i < usuarios.size(); i++) {
                    data += usuarios.get(i).getCi() + "/" + usuarios.get(i).getCorreo() + (i < usuarios.size() - 1 ? "#" : "");
                }

                response.getWriter().write(data);
            }
        } else if (request.getParameter("agregarAdmin") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            Usuario u = new Usuario();
            u.setCi(request.getParameter("ci"));
            u.setCorreo(request.getParameter("correo"));
            new Thread(new Runnable() {
                @Override
                public void run() {
                    CCorreo.enviarContrasenia(u);
                }
            }).start();
            response.getWriter().write(CHospital.agregarAdministrador(URLDecoder.decode(request.getParameter("nomHospital"), "UTF-8"), u));
        } else if (request.getParameter("eliminarAdmin") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            CHospital.borrarAdministrador(URLDecoder.decode(request.getParameter("nomHospital")), URLDecoder.decode(request.getParameter("ciAdmin")));
            response.getWriter().write("OK");
        } else if (request.getParameter("calcularTiempo") != null) {
            String[] horaInicio = request.getParameter("horaInicio").split(":");
            String[] horaFin = request.getParameter("horaFin").split(":");
            int cant = Integer.valueOf(request.getParameter("cant"));

            Date hi = new Date(2018, 5, 16, Integer.valueOf(horaInicio[0]), Integer.valueOf(horaInicio[1]));
            Date hf = new Date(2018, 5, 16, Integer.valueOf(horaFin[0]), Integer.valueOf(horaFin[1]));

            long mins = ((hf.getTime() - hi.getTime()) / cant) / 1000 / 60;

            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");

            if (mins <= 0) {
                response.getWriter().write("ERR");
            } else {
                response.getWriter().write(mins + "");
            }
        }
    }
}
