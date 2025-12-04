const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//modificar con la correccion de juampi de / from=0 & limit=4
app.get('/api/heladerias', (req, res) => {
	const dataPath = path.join(__dirname, 'archivosJson/heladerias.json');
	const data = fs.readFileSync(dataPath, 'utf8');  // CAMBIAR A ASINCRONICO - sacar sync en todo
	res.json(JSON.parse(data));
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
	if (!nombre || !descripcion || puntuacion === undefined || puntuacion === "" || isNaN(puntuacion) || puntuacion < 0 || puntuacion > 5) {
		return res.status(400).json({ message: "Datos inválidos" });
	}
	const nuevaResenia = {
		nombre,
		descripcion,
		puntuacion: parseInt(puntuacion)
	};
	heladeria.resenias.push(nuevaResenia);
	fs.writeFileSync(dataPath, JSON.stringify(heladerias, null, 2));

	return res.status(201).json({ message: "Reseña guardada correctamente", resenia: nuevaResenia })
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

