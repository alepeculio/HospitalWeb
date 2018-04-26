/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import Clases.Usuario;
import Controladores.CUsuario;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Ale
 */
@WebServlet(name = "SUsuario", urlPatterns = {"/SUsuario"})
public class SUsuario extends HttpServlet {

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
                        CUsuario cu = new CUsuario();
                        Usuario u = cu.login(ci, contrasenia);
                        if (u != null) {
                            request.getSession().setAttribute(ci, u.getUsuario());
                            if (recordarme != null) {
                                Cookie userCookie = new Cookie("ci_HospitalWeb", ci);
                                Cookie passCookie = new Cookie("contrasenia_HospitalWeb", contrasenia);
                                userCookie.setMaxAge(60 * 60 * 24 * 365); //Store cookie for 1 year
                                passCookie.setMaxAge(60 * 60 * 24 * 365);
                                response.addCookie(userCookie);
                                response.addCookie(passCookie);
                            }
                            request.getRequestDispatcher("vistas/inicio.jsp").forward(request, response);
                        } else {
                            request.setAttribute("mensaje_error", "C.I y/o contraseña incorrectos");
                            request.getRequestDispatcher("vistas/login.jsp").forward(request, response);
                        }
                    }
                    break;
                case "registro":
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
