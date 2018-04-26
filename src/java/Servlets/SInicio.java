/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import java.io.IOException;
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
@WebServlet(name = "SInicio", urlPatterns = {"/SInicio"})
public class SInicio extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String ci = "";
        String contrasenia = "";
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("ci_HospitalWeb".equals(cookie.getName())) {
                    ci = cookie.getValue();
                } else if ("contrasenia_HospitalWeb".equals(cookie.getName())) {
                    contrasenia = cookie.getValue();
                }
            }
            if (!ci.equals("") && !contrasenia.equals("")) {
                request.setAttribute("ci", ci);
                request.setAttribute("contrasenia", contrasenia);
                request.getRequestDispatcher("/SUsuario?accion=login").forward(request, response);

            } else {
                request.getRequestDispatcher("vistas/login.jsp").forward(request, response);
            }
        } else {
            request.getRequestDispatcher("vistas/login.jsp").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
