const header = document.getElementById('header');
const footer = document.getElementById('footer');

header.innerHTML = `
    <img class="Logo" src="./imagenes/logo.png" alt="logo" />
    <div class="Gelato">
        <h1>Gelato</h1>
    </div>
    <div class="Separador"></div>
    <nav>
        <ul>
            <li><a href="./index.html"><img class="ImagenCabecera" src="./imagenes/casa.svg" alt="inicio" />Inicio</a></li>
            <li class="search"><a id="busqueda"><img class="ImagenCabecera" src="./imagenes/lupa.svg" alt="buscar" />
                <input type="text" placeholder="Buscar"></a></li>
            <li><a><img class="ImagenCabecera" src="./imagenes/filtro.svg" alt="filtrar" />Ordenar</a></li>
            <li><a id="aleatorio"><img class="ImagenCabecera" src="./imagenes/star.png" alt="star" /></a></li>
        </ul>
    </nav>`;

fetch('./archivosJson/footer.json')
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

document.getElementById('aleatorio').addEventListener('click', () => {
    window.location.href = './heladeriaInfo.html?id=' + Math.floor(Math.random() * 20 + 1);
});

document.getElementById('busqueda').addEventListener('click', () => {

});