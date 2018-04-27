package Servlets;

import Clases.Hospital;
import Controladores.CHospital;
import Controladores.Singleton;
import java.io.IOException;
import java.net.URLDecoder;
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
        request.setCharacterEncoding ("UTF-8");
        if (request.getParameter("cargar") != null) {
            request.setAttribute ("hospitales", CHospital.obtenerHospitales());
            request.getRequestDispatcher("vistas/cargarHospital.jsp").forward(request, response);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("ingresarNuevo") != null) {
            Hospital h = new Hospital ();
            h.setNombre (URLDecoder.decode (request.getParameter("nombre"), "UTF-8"));
            h.setPublico (request.getParameter("tipo").equals ("on"));
            h.setDepartamento (URLDecoder.decode (request.getParameter("departamento"), "UTF-8"));
            h.setCalle (URLDecoder.decode (request.getParameter("calle"), "UTF-8"));
            h.setNumero (Integer.valueOf (request.getParameter("nro")));
            h.setLatitud (Double.valueOf (request.getParameter("lat")));
            h.setLongitud (Double.valueOf (request.getParameter("lng")));
            Singleton.getInstance().persist(h);
            request.setAttribute ("hospitales", CHospital.obtenerHospitales());
            request.getRequestDispatcher("vistas/cargarHospital.jsp").forward(request, response);
        } else if (request.getParameter ("nombre") != null) {
            CHospital.borrarHospital (request.getParameter ("nombre"));
        } else if (request.getParameter ("existe") != null){
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            response.getWriter ().write (CHospital.obtenerHospital(request.getParameter ("existe")) == null ? "no" : "si");
        } else if (request.getParameter ("obtener") != null) {
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            
            Hospital h = CHospital.obtenerHospital(request.getParameter ("obtener"));
            if (h != null)
                response.getWriter ().write (String.format ("%s@%s@%s@%s", h.getNombre (), h.isPublico () ? "Publico" : "Privado", h.getDepartamento (), h.getCalle () + ", " + h.getNumero ()));
            else
                response.getWriter ().write ("NOPE");
        }
    }
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
