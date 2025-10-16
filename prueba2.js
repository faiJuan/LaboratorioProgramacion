
const seccion = document.getElementById('sec1');
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
heladeriasGlobal = [];  
let heladeria={};

fetch('./heladerias.json')
  .then(response => response.json()) 
  .then(heladerias => {
        heladeriasGlobal = heladerias;
        let encontrado=false;
        let contador=0;
        while(!encontrado){
                if(id===heladeriasGlobal[contador].id){
                        encontrado=true;
                        heladeria=heladeriasGlobal[contador];
                }else{
                        contador++;
                }
        }
    seccion.innerHTML=`<h2 class="titulo">hola</h2>`;
    const informacion = document.createElement("div");
    informacion.classList.add("informacion");
    informacion.innerHTML=`<div class="organizador">
            <img class="imagen" src="${heladeria.logoUrl}" alt="Logo heladeria ${heladeria.nombre}" />
            <div class="informacion">
                <p>${heladeria.info}</p>
                <ul>
                    <li>Direccion: ${heladeria.direccion}</li>
                    <li>${heladeria.puntuacion}</li>
                </ul>
                <div class="Contactos">
                    <li class="C"><img class="ContactosImg" src="imagenes/gmail.png"
                            alt="imagen del correo electronico" />${heladeria.gmail} </li>
                    <li class="C"><img class="ContactosImg" src="imagenes/telefono.png"
                            alt="imagen del correo electronico" />${heladeria.telefono}</li>
                    <li class="C"><img class="ContactosImg" src="imagenes/ig.png"
                            alt="imagen del correo electronico" />${heladeria.instagram}</li>
                </div>
            </div>
            <a href="${heladeria.sabores}" target="_blank"><img class="mapa" src="imagenes/sabores.png"
                    alt="Logo heladeria ${heladeria.nombre}" /></a>
        `;
    seccion.appendChild(informacion);
})
  .catch(error => console.error('Error cargando el JSON:', error));
