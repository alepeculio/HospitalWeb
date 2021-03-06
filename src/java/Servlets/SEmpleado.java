package Servlets;

import Clases.Empleado;
import Clases.EstadoTurno;
import Clases.HorarioAtencion;
import Clases.Usuario;
import Controladores.CEmpleado;
import Controladores.CUsuario;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Ale
 */
@WebServlet(name = "SEmpleado", urlPatterns = {"/SEmpleado"})
public class SEmpleado extends HttpServlet {

    CUsuario cusuario = new CUsuario();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "obtEmpleado":
                    response.setContentType("application/json");
                    Empleado e = CUsuario.getEmpleado(Long.valueOf(request.getParameter("id")));
                    response.getWriter().write(new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(e == null ? "ERR" : e));
                    break;
                case "actualizarHA":
                    String idHA = request.getParameter("idHA");
                    String idTurno = request.getParameter("idTurno");
                    String estado = request.getParameter("estado");
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(CEmpleado.actualizarHA(idHA, idTurno, EstadoTurno.valueOf(estado)));
                    break;
                case "finalizarHA":
                    String idHAfinalizar = request.getParameter("idHA");
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write((CEmpleado.finalizarHA(idHAfinalizar)) ? "OK" : "ERR");
                    break;
                case "cancelarTurno":
                    String turno = request.getParameter("idTurno");
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(CEmpleado.cancelarTurno(Integer.valueOf(turno)) ? "OK" : "ERR");
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
