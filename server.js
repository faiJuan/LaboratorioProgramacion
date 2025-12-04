const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//modificar con la correccion de juampi de / from=0 & limit=4

/*app.get('/api/heladerias', (req, res) => {
	const dataPath = path.join(__dirname, 'archivosJson/heladerias.json');
	const data = fs.readFileSync(dataPath, 'utf8');  // CAMBIAR A ASINCRONICO - sacar sync en todo
	res.json(JSON.parse(data));
});*/

app.get('/api/heladerias', (req, res) => {
	const dataPath = path.join(__dirname, 'archivosJson/heladerias.json');
	const data = fs.readFileSync(dataPath, 'utf8');  // CAMBIAR A ASINCRONICO - sacar sync en todo
	const pagina=parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const inicio = (pagina - 1) * limit ;
	const fin = pagina * limit ;
	const heladerias=JSON.parse(data);
	const heladeriasPagina = heladerias.slice(inicio, fin);
	res.json(heladeriasPagina);
});

app.get('/api/heladerias/:id', (req, res) => {
	const dataPath = path.join(__dirname, 'archivosJson/heladerias.json');
	const data = fs.readFileSync(dataPath, 'utf8');
	const heladerias = JSON.parse(data);
	const id = parseInt(req.params.id, 10);
	const heladeria = heladerias.find(h => h.id === id);

	res.json(heladeria);
});

app.get('/api/footer', (req, res) => {
	const dataPath = path.join(__dirname, 'archivosJson/footer.json');
	const data = fs.readFileSync(dataPath, 'utf8');
	res.json(JSON.parse(data));
});

//agregar validacion
app.post('/api/heladerias/:id/resenias', (req, res) => {
	const heladeriaId = parseInt(req.params.id, 10);
	const { nombre, descripcion, puntuacion } = req.body;

	const dataPath = path.join(__dirname, 'archivosJson/heladerias.json');
	const data = fs.readFileSync(dataPath, 'utf8');
	const heladerias = JSON.parse(data);
	const heladeria = heladerias.find(h => h.id === heladeriaId);

	if (!heladeria) {
		return res.status(404).json({ message: "Heladeria no encontrada" });
	}
	if (!nombre || !descripcion || isNaN(puntuacion)) {
		return res.status(400).json({ message: "Datos inválidos" });
	}

	const nuevaResenia = {
		nombre,
		descripcion,
		puntuacion: parseInt(puntuacion)
	};

	heladeria.resenias.push(nuevaResenia);
	fs.writeFileSync(dataPath, JSON.stringify(heladerias, null, 2));

	res.status(201).json({ message: "Reseña guardada correctamente", resenia: nuevaResenia })
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

