const seccion1 = document.getElementById("Sec1");
const seccion2 = document.getElementById("Sec2");
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
heladeriasGlobal = [];
let heladeria = {};

fetch("./archivosJson/heladerias.json")
	.then((response) => response.json())
	.then((heladerias) => {
		heladeriasGlobal = heladerias;
		let encontrado = false;
		let contador = 0;
		while (!encontrado) {
			if (id === heladeriasGlobal[contador].id) {
				encontrado = true;
				heladeria = heladeriasGlobal[contador];
			} else {
				contador++;
			}
		}
		cargarInfo(heladeria);
		cargarResenias(heladeria);
	})
	.catch((error) => console.error("Error cargando el JSON:", error));

function cargarInfo(heladeria) {
	seccion1.innerHTML = `<h2 class="titulo">${heladeria.nombre}</h2>`;
	const organizador = document.createElement("div");
	organizador.classList.add("organizador");
	organizador.innerHTML += `
            <img class="imagen" src="./${heladeria.logoUrl}" alt="Logo heladeria ${heladeria.nombre}" />
            <div class="informacion">
                <p>${heladeria.info}</p>
                <ul>
                    <li><i>Dirección:</i> ${heladeria.direccion}</li>
                    <li><i>Puntuación:</i> ${calcularPuntuacion(heladeria.resenias)} 
					<img class="puntuacion" src="./imagenes/estrella.svg" alt="estrella"/> </li>
                </ul>
                <div class="Contactos">
                    <li><img class="ContactosImg" src="./imagenes/gmail.png"
                            alt="imagen del correo electronico" />${heladeria.gmail}</li>
                    <li><img class="ContactosImg" src="./imagenes/telefono.png"
                            alt="imagen del telefono" />${heladeria.telefono}</li>
                    <li><a href="${heladeria.igUrl}" target="_blank"> <img class="ContactosImg" src="./imagenes/ig.png"
                            alt="imagen de instagram" />${heladeria.instagram} </a></li>
                </div>
            </div>
            <a href="${heladeria.sabores}" target="_blank"><img class="sabores" src="./imagenes/sabores.png"
                    alt="imagen bocha de helado sabores ${heladeria.nombre}" /></a>
        `;
	seccion1.appendChild(organizador);
	seccion1.innerHTML += `<a class="BotonSec" href="#Sec2"> Reseñas </a>`;
}

function calcularPuntuacion(resenias) {
	let result = 0;
	for (const resenia of resenias) {
		result += resenia.puntuacion;
	}
	return (result / resenias.length).toFixed(1);
}

function cargarResenias(heladeria) {
	const organizador = document.createElement("div");
	organizador.classList.add("ContenedorResenias");
	organizador.innerHTML = `<p class="ReseniaCliente"> Aca va a ir la caja donde el cliente puede agregar su reseña ~ en proceso de
                creacion </p>`;
	for (const resenia of heladeria.resenias) {
		organizador.innerHTML += `<p class="Resenia"> "${resenia.descripcion}" 
                                        <br>— ${resenia.nombre}.
                                        <br>Puntuacion: ${resenia.puntuacion} </p>`;
	}
	seccion2.appendChild(organizador);
	/*arreglo temporal para que vuelva al principio de la pagina, idealmente queriamos tener href="#header"
					pero no funciona, y hacer a #Sec1 queda muy abajo*/
	seccion2.innerHTML += `<a class="BotonSec" href="./heladeriaInfo.html?id=${heladeria.id}"> Volver </a>`;
}
