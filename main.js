//Carga de heladerias
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
                        <li id=${estaAbierto(heladeria.horaApertura, heladeria.horaCierre)}> ${estaAbierto(heladeria.horaApertura, heladeria.horaCierre)} </li>
                    </ul>
                </div>
            <a class="botonInfo" href="archivosHtml/${heladeria.nombre.split(' ').join('').toLowerCase()}Info.html" target="_blank">info</a>
            </div>
            `;
            contenedor.appendChild(nuevaH);
        }
    })
    .catch(error => console.error('Error cargando el JSON:', error));

function estaAbierto(abre, cierra) {
    let estado = "Cerrado";
    if (new Date().getHours() >= abre && new Date().getHours() < cierra) {
        console.log(new Date().getHours());
        estado = "Abierto";
    }
    return estado;
};

//Carga del footer
const footer = document.getElementById('footer');
fetch('./footer.json')
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


