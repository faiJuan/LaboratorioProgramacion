const header = document.getElementById('header');
const footer = document.getElementById('footer');

// agregados en innerHTML: class="dropdown" y las opciones del menu entre <ul> y </ul>
header.innerHTML = `
    <img class="Logo" src="./imagenes/logo.png" alt="logo" />
    <div class="Gelato">
        <h1>Gelato</h1>
    </div>
    <div class="Separador"></div>
    <nav>
        <ul>
            <li><a href="./index.html"><img class="ImagenCabecera" src="./imagenes/casa.svg" alt="inicio" />Inicio</a></li>
            <li id="b" class="search"><a id="busqueda"><img class="ImagenCabecera" src="./imagenes/lupa.svg" alt="buscar" />
                <input type="text" placeholder="Buscar"></a></li>
            <li id="o" class="dropdown"><a id="ordenar"><img class="ImagenCabecera" src="./imagenes/filtro.svg" alt="filtrar" />Ordenar</a>
                <ul class="dropdown-menu">
                    <li><a id="ordenAZ">Orden A-Z</a></li>
                    <li><a id="ordenZA">Orden Z-A</a></li>
                    <li><a id="ordenPuntuacion">Mejor Puntuanción</a></li>
                </ul>
            </li>
            <li id="a"><a id="aleatorio"><img class="ImagenCabecera" src="./imagenes/star.png" alt="star" /></a></li>
        </ul>
    </nav>`;
ocultar();

function ocultar() {
    const urlActual = window.location.href;
    console.log(urlActual);
    console.log(urlActual.includes('heladeriaInfo'));
    if (urlActual.includes('heladeriaInfo')) {
        document.getElementById("b").style.display = "none";
        document.getElementById("o").style.display = "none";
        document.getElementById("a").style.display = "none";
    }
}

fetch('/api/footer')
    .then(response => response.json())
    .then(integrantes => {
        footer.innerHTML = `
        <h3>Grupo 7</h3>  
        <div class="Integrantes"> 
            <a class="Git" href="${integrantes[0].linkGit}" target="_blank"> <img src="${integrantes[0].fotoGit}" alt="foto de perfil github"><h3>${integrantes[0].integrante}</h3></a>
            <a class="Git" href="${integrantes[1].linkGit}" target="_blank"><img src="${integrantes[1].fotoGit}" alt="foto de perfil github"><h3>${integrantes[1].integrante}</h3></a>
            <a class="Git" href="${integrantes[2].linkGit}" target="_blank"><img src="${integrantes[2].fotoGit}" alt="foto de perfil github"><h3>${integrantes[2].integrante}</h3></a>   
        </div>`;
    })
    .catch(error => console.error('Error cargando el JSON:', error));

document.getElementById('aleatorio').addEventListener('click', () => {  //recomendacion aleatoria
    window.location.href = './heladeriaInfo.html?id=' + Math.floor(Math.random() * 20 + 1);
});

const inputBusqueda = document.querySelector('#busqueda input');      //agregado para realizar busquedas de heladerias
inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value;
    const evento = new CustomEvent("filtrarHeladerias", {
        detail: texto,
    });
    document.dispatchEvent(evento);
});

//agregado para el menu de ordenar
const botonOrdenar = document.getElementById('ordenar');    //agregado esto para menu ordenar
const menuOrdenar = document.querySelector('#o .dropdown-menu');    //agregado esto para menu ordenar

botonOrdenar.addEventListener('click', (e) => {
    e.preventDefault(); //agrego esto porque no uso un boton, sino un vinculo, pero quiero que NO se comporte como tal
    menuOrdenar.classList.toggle('show');
});

botonOrdenar.addEventListener('click', (e) => {
    if (!document.getElementById('o').contains(e.target)) {    //para cerrar el menu al hacer click fuera de ordenar
        menuOrdenar.classList.remove('show');
    }
});

// agregados para las opciones de ordenamiento de las heladerias a mostrar
// cambio 'ordenar' por 'ordenAZ' segun lo agregado en el menu
document.getElementById('ordenAZ').addEventListener('click', () => {    //agregado para ordenar heladerias por nombre A-Z
    const evento = new CustomEvent("ordenarHeladerias", { detail: "nombreAscendente", });
    document.dispatchEvent(evento);
});

document.getElementById('ordenZA').addEventListener('click', () => {    //agregado para ordenar heladerias por nombre A-Z
    const evento = new CustomEvent("ordenarHeladerias", { detail: "nombreDescendente", });
    document.dispatchEvent(evento);
});

document.getElementById('ordenPuntuacion').addEventListener('click', () => {    //agregado para ordenar heladerias por nombre A-Z
    const evento = new CustomEvent("ordenarHeladerias", { detail: "puntuacion", });
    document.dispatchEvent(evento);
});