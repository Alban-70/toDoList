const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/taches', require('./routes/taches'));
app.use('/categories', require('./routes/categories'));

app.listen(PORT, () => console.log(`] 🚀 Serveur démarré sur http://localhost:${PORT}`));
