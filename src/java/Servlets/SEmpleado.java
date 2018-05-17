package Servlets;

import Clases.Empleado;
import Clases.EstadoTurno;
import Clases.Usuario;
import Controladores.CEmpleado;
import Controladores.CUsuario;
import java.io.IOException;
import java.io.PrintWriter;
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

        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "inicio":
                    Empleado empleado = cusuario.getEmpleadobyUsuario(((Usuario) request.getSession().getAttribute("usuario")).getId());
                    request.setAttribute("empleado", empleado);
                    request.getRequestDispatcher("vistas/empleado.jsp").forward(request, response);
                    break;
                case "cambiarTurno":
                    String turno = request.getParameter("idTurno");
                    String estado = request.getParameter("estado");
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write((CEmpleado.setEstadoTurno(turno, EstadoTurno.valueOf(estado))) ? "OK" : "ERR");
                    break;
                case "cambiarClienteActual":
                    String idHA  = request.getParameter("idHA");
                    String numero = request.getParameter("numero");
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write((CEmpleado.setClienteActualHA(idHA, Integer.valueOf(numero))) ? "OK" : "ERR");
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
