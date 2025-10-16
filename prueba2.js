
const seccion = document.getElementById('sec1');

fetch('./heladerias.json')
  .then(response => response.json()) 
  .then(heladerias => {
    seccion.innerHTML=`<h2 class="titulo">${heladeria.nombre}</h2>`;
    const informacion = document.createElement("div");
    informacion.classList.add("informacion");
    informacion.innerHTML=`<div class="organizador">
            <img class="imagen" src="../${heladerias[contador].logoUrl}" alt="Logo heladeria ${heladerias[contador].nombre}" />
            <div class="informacion">
                <p>${heladerias[contador].info}</p>
                <ul>
                    <li>Direccion: ${heladerias[contador].direccion}</li>
                    <li>${heladerias[contador].puntuacion}</li>
                </ul>
                <div class="Contactos">
                    <li class="C"><img class="ContactosImg" src="../imagenes/gmail.png"
                            alt="imagen del correo electronico" />rrhh@cuorehelados.com.ar </li>
                    <li class="C"><img class="ContactosImg" src="../imagenes/telefono.png"
                            alt="imagen del correo electronico" />2994 38-6760</li>
                    <li class="C"><img class="ContactosImg" src="../imagenes/ig.png"
                            alt="imagen del correo electronico" />cuorehelados</li>
                </div>
            </div>`;
    seccion.appendChild(informacion);
})
  .catch(error => console.error('Error cargando el JSON:', error));
