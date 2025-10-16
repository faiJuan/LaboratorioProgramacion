
const heladerias=[
    {
        "nombre": "Pire Patagonia",
        "rangoPrecio": "$$$",
        "direccion": "Bv. Marcelo T. de Alvear 29, Neuquén",
        "telefono": "299374368",
        "gmail": "pirePatagonia@gmail",
        "puntuacion": 4.5,
        "info": "Piré es una empresa familiar con presencia en la Patagonia desde 1986. El objetivo principal es ofrecer el mejor helado artesanal y un excelente servicio. Para lograrlo, cuestan con una amplia gama de productos. Más de 50 sabores y variedades tales como postres, alfajores, bombones, palitos helados, tortas, chocolates y opciones saladas. Tienen puntos de venta en las provincias de Neuquén y Río Negro.",
        "instagram":"Pire Patagonia",
        "logoUrl":"imagenes/Pire.png"
    },
    {
        "nombre": "Cuore di Panna",
        "rangoPrecio": "$$$$",
        "direccion": "Santa Fé 797, Neuquén",
        "telefono": "299374368",
        "gmail": "rrhh@cuorehelados.com.ar",
        "puntuacion": 4.4,
        "info": "Más de 20 años del verdadero sabor del helado italiano en Cuore di Panna, donde la pasión por la excelencia se refleja en cada uno de sus sabores. El compromiso con la calidad comienza con la cuidadosa selección de las materias primas de origen italiano, garantizando que el proceso y maquinarias de elaboración sigan con los estándares de calidad más elevados. Cuentan con una fábrica y productos con habilitación nacional para producir y vender a lo largo y ancho de todo el país.",
        "instagram":"cuorehelados"
    },
    {
        "nombre": "Lucciano's",
        "rangoPrecio": "$$$$$",
        "direccion": "Avenida Argentina 1273, Neuquén",
        "telefono": "299 411-8195",
        "gmail": "info@luccianos.com.ar",
        "puntuacion": 4.4,
        "info": "Lucciano’s es una empresa familiar que nace a partir del deseo de atender al segmento de consumidores más exigentes de helado artesanal de nuestro país. Nos fuimos a Italia y trajimos la última técnología para fabricar helado y a los mejores maestros heladeros. Combinamos las mejores materias primas nacionales e italianas junto a chocolates belgas para así desarrollar un producto único, inigualable y así nos convertimos en el sinónimo del mejor helado Premium del mercado.",
        "instagram":"luccianos_"
    },
    {
        "nombre": "Grido Helados",
        "rangoPrecio": "$",
        "direccion": "Av. Coronel Olascoaga 1035, Neuquén",
        "telefono": "299 442-7519",
        "gmail": "gridoHeladosNeuquen@gmail.com",
        "puntuacion": 4.0,
        "info": "Tiene como objetivo crecer y desarrollarse ofreciendo con calidad y calidez cremas heladas deliciosas, saludables y seguras. Así sus clientes vivirán momentos placenteros, en un ambiente agradable y familiar.",
        "instagram":"gridohelados"
    }
]

for (const heladeria of heladerias) {
    const nuevaH = document.createElement("div");
    nuevaH.classList.add("cuadro");
    nuevaH.innerHTML = `
        <h2 class="titulo">${heladeria.nombre}</h2>
        <div class="contenido">
            <img src="${heladeria.logoUrl}" alt="${heladeria.nombre}" class="imagen">
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
