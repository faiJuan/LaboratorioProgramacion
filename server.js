const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

app.get('/api/heladerias', (req, res) => {
  const dataPath = path.join(__dirname, 'archivosJson/heladerias.json');
  const data = fs.readFileSync(dataPath, 'utf8'); // leer el archivo JSON
  res.json(JSON.parse(data)); // enviarlo como respuesta JSON
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

