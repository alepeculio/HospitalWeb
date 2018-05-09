<%@page import="java.util.List"%>
<%@page import="Clases.Hospital"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <jsp:include page="include_css.html"/>
    <jsp:include page="include_js.html"/>
    <title>Inicio</title>
    <link rel="stylesheet" href="styles/cargaHospital.css">
</head>
<body background="img/fondo.png">
    <jsp:include page="header.jsp"/>


    <div class="fondo mapa">
        <div id="mapa" style="width: 78vw; height: 60vh;"></div>
    </div>

    <div class="fondo boton">
        <label for="mode">Modo de viaje</label>
        <select id="mode" name="mode">
          <option value="DRIVING">Conduciendo</option>
          <option value="WALKING">Caminando</option>
          <option value="BICYCLING">Bicicleta</option>
          <option value="TRANSIT">Transporte Público</option>
      </select>
  </div>

  <div class="fondo boton">
    <strong>Seleccione un hospital para obtener indicaciones.</strong>
</div>

<script src="js/indicaciones.js"></script>
<%
List<Hospital> hospitales = (List<Hospital>) request.getAttribute("hospitales");
for (Hospital h : hospitales) {%>
<script>
    agregarHospital('<%= h.getNombre()%>', <%= h.getLatitud()%>, <%= h.getLongitud()%>);
</script>
<%}
%>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1gnU_q4aEtnUkQGKyZbaT--TH76oRL-4&libraries=places&callback=initMapa" sync defer></script>
</html>
