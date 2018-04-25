/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
            request.getRequestDispatcher("vista/cargarHospital.jsp").forward(request, response);
        } else if (request.getParameter("ingresarNuevo") != null) {
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
            request.getRequestDispatcher("vista/cargarHospital.jsp").forward(request, response);
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
