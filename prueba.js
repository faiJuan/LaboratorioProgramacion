const contenedor = document.getElementById('principal');


fetch('heladerias.json')
  .then(response => response.json()) 
  .then(heladerias => {
    
    heladerias.forEach(heladeria => {
      
      const div = document.createElement('div');
      div.classList.add('cuadro');

      
      div.innerHTML = `
        <strong>Nombre:</strong> ${heladeria.nombre} ${heladeria.nombre}<br>
        <strong>Edad:</strong> ${heladeria.nombre}
      `;

      // Lo agregamos al contenedor
      contenedor.appendChild(div);
    });
  })
  .catch(error => console.error('Error cargando el JSON:', error));
