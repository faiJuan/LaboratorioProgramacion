const contenedor = document.getElementById('principal');


fetch('./heladerias.json')
  .then(response => response.json()) 
  .then(heladerias => {
    
    for (const heladeria of heladerias) {
    const nuevaH = document.createElement("div");
    nuevaH.classList.add("cuadro");
    nuevaH.innerHTML = `
        <h2 class="titulo">${heladeria.nombre}</h2>
        <div class="contenido">
            <img src="${heladeria.logoUrl}" alt="logo ${heladeria.nombre}" class="imagen">
            <ul class="info">
                <li><b>Rango de precios:</b> ${heladeria.rangoPrecio}</li>
                <li><b>Direccion:</b> ${heladeria.direccion}</li>
                <li id="Abierto">Abierto</li>
            </ul>
        </div>
        <a class="botonInfo" href="archivosHtml/${heladeria.nombre.split(' ').join('').toLowerCase()}Info.html" target="_blank">info</a>
        </div>
    `;
    document.getElementById("principal").appendChild(nuevaH);
}
  })
  .catch(error => console.error('Error cargando el JSON:', error));
