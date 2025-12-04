const contenedor = document.getElementById("principal");
const paginacion = document.getElementById("paginacion");
const HELADERIAS_POR_PAGINA = 4;
let paginaActual = 1;
let heladeriasGlobal = []; //para no mandar por parametro las heladerias
let heladeriasFiltradas = [] //para guardar las heladerias que se deben mostrar segun coincidencia con el buscador


	mostrarPagina2(paginaActual);
	crearBotonesPaginacion(21);

	function mostrarPagina2(paginaActual) {
	contenedor.innerHTML = "";
	let heladeriasPagina;

	fetch(`/api/heladerias?page=${paginaActual}&limit=${HELADERIAS_POR_PAGINA}`)
	.then((response) => response.json())
	.then((heladerias) => {
		heladeriasPagina=heladerias;
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
				<li class="infoPuntuacion"><b>Puntuación:</b> ${calcularPuntuacion(heladeria.resenias)} 
				<img class="puntuacion" src="./imagenes/estrella.svg" alt="estrella"/> </li>
                <li id=${estaAbierto(heladeria.horaApertura, heladeria.horaCierre)}> 
				${estaAbierto(heladeria.horaApertura, heladeria.horaCierre)} </li>
            </ul>
        </div>`;
		const botoninfo = document.createElement("a");
		botoninfo.innerText = "info";
		botoninfo.classList.add("botonInfo");
		botoninfo.href = `./heladeriaInfo.html?id=${heladeria.id}`;
		botoninfo.target = "_self";
		nuevaH.appendChild(botoninfo);
		contenedor.appendChild(nuevaH);
	}
	})
	.catch((error) => console.error("Error cargando el JSON:", error));
}

function crearBotonesPaginacion(totalHeladerias) {
	paginacion.innerHTML = "";
	const totalPaginas = Math.ceil(totalHeladerias / HELADERIAS_POR_PAGINA);

	const btnAnterior = document.createElement("button");
	btnAnterior.textContent = "<";
	btnAnterior.disabled = paginaActual === 1;
	btnAnterior.addEventListener("click", () => {
		if (paginaActual > 1) {
			paginaActual--;
			mostrarPagina2(paginaActual);
			crearBotonesPaginacion(totalHeladerias);
		}
	});
	paginacion.appendChild(btnAnterior);

	for (let i = 1; i <= totalPaginas; i++) {
		const btn = document.createElement("button");
		btn.textContent = i;
		if (i === paginaActual) btn.disabled = true;
		btn.addEventListener("click", () => {
			paginaActual = i;
			mostrarPagina2(paginaActual);
			crearBotonesPaginacion(totalHeladerias);
		});
		paginacion.appendChild(btn);
	}

	const btnSiguiente = document.createElement("button");
	btnSiguiente.textContent = ">";
	btnSiguiente.disabled = paginaActual === totalPaginas;
	btnSiguiente.addEventListener("click", () => {
		if (paginaActual < totalPaginas) {
			paginaActual++;
			mostrarPagina2(paginaActual);
			crearBotonesPaginacion(totalHeladerias);
		}
	});
	paginacion.appendChild(btnSiguiente);
}

/*function mostrarPagina(pagina) {
	contenedor.innerHTML = "";
	const inicio = (pagina - 1) * HELADERIAS_POR_PAGINA;
	const fin = inicio + HELADERIAS_POR_PAGINA;
	const heladeriasPagina = heladeriasFiltradas.slice(inicio, fin);	//cambio heladeriasGlobal por heladeriasFiltradas

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
				<li class="infoPuntuacion"><b>Puntuación:</b> ${calcularPuntuacion(heladeria.resenias)} 
				<img class="puntuacion" src="./imagenes/estrella.svg" alt="estrella"/> </li>
                <li id=${estaAbierto(heladeria.horaApertura, heladeria.horaCierre)}> 
				${estaAbierto(heladeria.horaApertura, heladeria.horaCierre)} </li>
            </ul>
        </div>`;
		const botoninfo = document.createElement("a");
		botoninfo.innerText = "info";
		botoninfo.classList.add("botonInfo");
		botoninfo.href = `./heladeriaInfo.html?id=${heladeria.id}`;
		botoninfo.target = "_self";
		nuevaH.appendChild(botoninfo);
		contenedor.appendChild(nuevaH);
	}
}*/



//Funcion para saber si la heladeria esta abierta o cerrada -- Hay que arreglar la carga de los horarios del json
function estaAbierto(abre, cierra) {
	let estado = "Cerrado";
	if (new Date().getHours() >= abre && new Date().getHours() < cierra) {
		console.log(new Date().getHours());
		estado = "Abierto";
	}
	return estado;
}

function calcularPuntuacion(resenias) {
	let result = 0;
	for (const resenia of resenias) {
		result += resenia.puntuacion;
	}
	return (result / resenias.length).toFixed(1);
}

function filtrarHeladerias(textoIngresado) {		//agregado para filtrar heladerias
	textoIngresado = textoIngresado.toLowerCase().trim();
	if (textoIngresado === "") {
		heladeriasFiltradas = heladeriasGlobal;
	} else {
		heladeriasFiltradas = heladeriasGlobal.filter((h) =>
			h.nombre.toLowerCase().includes(textoIngresado)
		);
	}
	paginaActual = 1;
	mostrarPagina(paginaActual);
	crearBotonesPaginacion(heladeriasFiltradas.length);
}

document.addEventListener("filtrarHeladerias", (evento) => {
	filtrarHeladerias(evento.detail);
});

function ordenarHeladerias(tipoOrdenamiento) {		//agregado para ordenar heladerias
	switch (tipoOrdenamiento) {
		case "nombreAscendente":
			heladeriasFiltradas.sort((heladeria1, heladeria2) => heladeria1.nombre.localeCompare(heladeria2.nombre));
			break;
		case "nombreDescendente":
			heladeriasFiltradas.sort((heladeria1, heladeria2) => heladeria2.nombre.localeCompare(heladeria1.nombre));
			break;
		case "puntuacion":
			heladeriasFiltradas.sort((heladeria1, heladeria2) => parseFloat(calcularPuntuacion(heladeria2.resenias)) - parseFloat(calcularPuntuacion(heladeria1.resenias)));
			break;
	}
	paginaActual = 1;
	mostrarPagina(paginaActual);
	crearBotonesPaginacion(heladeriasFiltradas.length);
}

document.addEventListener("ordenarHeladerias", (evento) => {
	ordenarHeladerias(evento.detail);
});

