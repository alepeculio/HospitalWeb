<%-- 
    Document   : login
    Created on : Apr 10, 2018, 9:39:35 PM
    Author     : Ale
--%>

<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<!DOCTYPE html>
<html>
    <head>  
        <jsp:include page="include_css.html"/>
        <title>Login</title>
 
    </head>
    <body background="img/fondo.png">
         <!-- Header -->
         <jsp:include page="header.jsp"/>
            
        <div class="container" style="margin-top: 20vh">
            <div class="row">
                <div class="col-sm-5">
                    <div class="panel" style="padding: 20px">
                        <h1>
                            Inicie Sesion!
                        </h1>
                        </br>
                        <form accept-charset="UTF-8" role="form">
                            <div class="form-group">
                                <input class="form-control" placeholder="C.I. / E-mail" name="email" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Contraseña" name="password" type="password" value="">
                            </div>
                            <div class="checkbox" style="text-align: center">
                                <label>
                                    <input name="remember" type="checkbox" value="Recordarme"> Recordarme
                                </label>
                            </div>
                            <input class="btn btn-lg btn-success btn-block" type="submit" value="Iniciar Sesion">
                        </form>
                    </div>
                    
                </div>
                <div class="col-sm-1"></div>
                <div class="col-sm-6">
                    <div class="panel" style="padding: 20px">
                        <h1>
                            Bienvenido!
                        </h1>
                        </br>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="include_js.html"/>
    </body>
</html>

