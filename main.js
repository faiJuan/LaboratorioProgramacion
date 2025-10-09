function estaCerrado(horarioCierre) {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    return horaActual >= horarioCierre ? "Cerrado" : "Abierto";
}

const heladerias = [{
    nombre: "Piré Patagonia 222",
    descripcion: "Heladería artesanal con sabores únicos de la Patagonia.",
    imagen: "imagenes/pire.jpg"
}]

for (const heladeria of heladerias) {
    const nuevaH = document.createElement("div");
    nuevaH.classList.add("cuadro");
    nuevaH.innerHTML = `
        <h2 class="titulo">${heladeria.nombre}</h2>
        <div class="contenido">
            <img src="${heladeria.imagen}" alt="${heladeria.nombre}">
            <p>${estaCerrado(heladeria.horarioCierre)}</p>
        </div>
    `;
    document.getElementById("principal").appendChild(nuevaH);
}