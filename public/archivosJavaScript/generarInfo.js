const seccion1 = document.getElementById("Sec1");
const seccion2 = document.getElementById("Sec2");
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

fetch(`/api/heladerias/${id}`)
	.then((response) => response.json())
	.then((heladeria) => {

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

	organizador.innerHTML = `
		<h2>Reseñas de ${heladeria.nombre}</h2> 
		<form class="ContenedorEscrituraResenia" id="form">
			<div class="Entrada">
				<textarea id="descripcion" name="descripcion" class="ReseniaCliente" cols="25" rows="5" maxlength="250" placeholder="Escribí tu reseña..." required></textarea>
			</div>
			<div class="OrdenarEtiquetas">
				<div class="Entrada">	
					<input type="text" id="nombre" name="nombre" required/>	
					<label for="nombre">Nombre:</label>
				</div>
				<div class="Entrada">
					<input type="number" id="puntuacion" name="puntuacion" min="0" max="5" required/>	
					<label for="puntuacion">Puntuación:</label>
				</div>
			</div>
			<div class="BotonesResenia">
				<button type="submit" class="BotonPublicar">Publicar</button>
				<button type="button" class="BotonCancelar">Cancelar</button>
			</div>
		</form>
	`;

	const lista = document.createElement("div");
	lista.classList.add("ListaResenias");
	for (const resenia of heladeria.resenias) {
		const p = document.createElement("p");
		p.classList.add("Resenia");
		p.innerHTML = `"${resenia.descripcion}"<br>— ${resenia.nombre}.<br>Puntuación: ${resenia.puntuacion} <img class="puntuacion" src="./imagenes/estrella.svg" alt="estrella"/>`;
		lista.appendChild(p);
	}

	const form = organizador.querySelector("form");
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		const nombre = formData.get("nombre");
		const descripcion = formData.get("descripcion");
		const puntuacion = formData.get("puntuacion");
		try {
			const response = await fetch(`/api/heladerias/${heladeria.id}/resenias`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nombre, descripcion, puntuacion }),
			});
			if (!response.ok) throw new Error("Error al enviar la reseña");
			const result = await response.json();
			const nuevaResenia = document.createElement("p");
			nuevaResenia.classList.add("Resenia");
			nuevaResenia.innerHTML = `"${result.resenia.descripcion}"<br>— ${result.resenia.nombre}.<br>Puntuación: ${result.resenia.puntuacion} <img class="puntuacion" src="./imagenes/estrella.svg" alt="estrella"/>`;
			lista.appendChild(nuevaResenia);

			form.reset();
			avisoPublicacion("Tu reseña fue cargada correctamente!", "success");

		} catch (error) {
			console.error(error);
			avisoPublicacion("Hubo un problema al publicar tu reseña", "error");
		}
	});
	const botonCancelar = form.querySelector(".BotonCancelar");
	botonCancelar.addEventListener("click", () => form.reset());

	organizador.appendChild(lista);
	seccion2.innerHTML = "";
	seccion2.appendChild(organizador);

	const volverBtn = document.createElement("a");
	volverBtn.classList.add("BotonSec");
	volverBtn.href = `./heladeriaInfo.html?id=${heladeria.id}`;
	volverBtn.textContent = "Volver";
	seccion2.appendChild(volverBtn);
}

function avisoPublicacion(message, type) {
	const msj = document.createElement("div");
	msj.classList.add("avisoPublicacion", type);
	msj.textContent = message;
	document.body.appendChild(msj);

	setTimeout(() => msj.classList.add("show"), 50);

	setTimeout(() => {
		msj.classList.remove("show");
		setTimeout(() => msj.remove(), 500);
	}, 4000);
}