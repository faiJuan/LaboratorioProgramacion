const contenedor = document.getElementById('principal');
const paginacion = document.getElementById('paginacion');

const HELADERIAS_POR_PAGINA = 4;  
let paginaActual = 1;
let heladeriasGlobal = [];  //para no mandar por parametro las heladerias          

fetch('./heladerias.json')
    .then(response => response.json())
    .then(heladerias => {
        heladeriasGlobal = heladerias;  
        mostrarPagina(paginaActual);       
        crearBotonesPaginacion(heladerias.length); 
    })
    .catch(error => console.error('Error cargando el JSON:', error));


function mostrarPagina(pagina) {
    contenedor.innerHTML = ''; 

    const inicio = (pagina - 1) * HELADERIAS_POR_PAGINA;
    const fin = inicio + HELADERIAS_POR_PAGINA;
    const heladeriasPagina = heladeriasGlobal.slice(inicio, fin);

    for (const heladeria of heladeriasPagina) {
        const nuevaH = document.createElement("div");
        nuevaH.classList.add("cuadro");
        nuevaH.innerHTML = `
      <h2 class="titulo">${heladeria.nombre}</h2>
      <div class="contenido">
          <img src="${heladeria.logoUrl}" alt="logo ${heladeria.nombre}" class="imagen">
          <ul class="info">
              <li><b>Rango de precios:</b> ${heladeria.rangoPrecio}</li>
              <li><b>Dirección:</b> ${heladeria.direccion}</li>
              <li id="Abierto">Abierto</li>
          </ul>
      </div>
      <a class="botonInfo" href="archivosHtml/heladeriaInfo${heladeria.id}.html" target="_blank">info</a>
    `;
        contenedor.appendChild(nuevaH);
    }
}


function crearBotonesPaginacion(totalHeladerias) {
    paginacion.innerHTML = '';
    const totalPaginas = Math.ceil(totalHeladerias / HELADERIAS_POR_PAGINA);
 
    const btnAnterior = document.createElement('button');
    btnAnterior.textContent = 'Anterior';
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarPagina(paginaActual);
            crearBotonesPaginacion(totalHeladerias);
        }
    });
    paginacion.appendChild(btnAnterior);

    // Botones numéricos de página
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === paginaActual) btn.disabled = true;
        btn.addEventListener('click', () => {
            paginaActual = i;
            mostrarPagina(paginaActual);
            crearBotonesPaginacion(totalHeladerias);
        });
        paginacion.appendChild(btn);
    }

    // Botón "Siguiente"
    const btnSiguiente = document.createElement('button');
    btnSiguiente.textContent = 'Siguiente';
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.addEventListener('click', () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarPagina(paginaActual);
            crearBotonesPaginacion(totalHeladerias);
        }
    });
    paginacion.appendChild(btnSiguiente);
}