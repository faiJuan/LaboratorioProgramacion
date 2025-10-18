const seccion = document.getElementById('Sec1');
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
heladeriasGlobal = [];  
let heladeria={};
console.log(id);
fetch('../heladerias.json')
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
        cargarInfo(heladeria);
    
})
  .catch(error => console.error('Error cargando el JSON:', error));

function cargarInfo(heladeria){
        seccion.innerHTML=`<h2 class="titulo">${heladeria.nombre}</h2>`;
        const organizador = document.createElement("div");
        organizador.classList.add("organizador");
        organizador.innerHTML+=`
            <img class="imagen" src="../${heladeria.logoUrl}" alt="Logo heladeria ${heladeria.nombre}" />
            <div class="informacion">
                <p>${heladeria.info}</p>
                <ul>
                    <li>Direccion: ${heladeria.direccion}</li>
                    <li>${heladeria.puntuacion}</li>
                </ul>
                <div class="Contactos">
                    <li class="C"><img class="ContactosImg" src="../imagenes/gmail.png"
                            alt="imagen del correo electronico" />${heladeria.gmail} </li>
                    <li class="C"><img class="ContactosImg" src="../imagenes/telefono.png"
                            alt="imagen del correo electronico" />${heladeria.telefono}</li>
                    <li class="C"><img class="ContactosImg" src="../imagenes/ig.png"
                            alt="imagen del correo electronico" />${heladeria.instagram}</li>
                </div>
            </div>
            <a href="${heladeria.sabores}" target="_blank"><img class="mapa" src="../imagenes/sabores.png"
                    alt="Logo heladeria ${heladeria.nombre}" /></a>
        `;
        seccion.appendChild(organizador);
        seccion.innerHTML+=`<a class="BotonSec" href="#Sec2"> Reseñas </a>`;
};
