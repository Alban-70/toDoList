const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/show', (req, res) => {
  db.all(`SELECT * FROM Categorie
    ORDER BY nom_categorie ASC`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});



router.post('/add', (req, res) => {
  const { nom } = req.body;

  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'Le nom de la catégorie est requis.' });
  }

  const nomNormalise = nom.trim();

  // Vérifier si la catégorie existe déjà
  db.get(
    'SELECT * FROM Categorie WHERE LOWER(nom_categorie) = LOWER(?)',
    [nomNormalise],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row) {
        // Catégorie déjà existante
        return res.status(409).json({ error: 'Cette catégorie existe déjà.' });
      }

      // Sinon, insérer la nouvelle catégorie
      db.run(
        'INSERT INTO Categorie (nom_categorie) VALUES (?)',
        [nomNormalise],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true, id: this.lastID, nom: nomNormalise });
        }
      );
    }
  );
});

module.exports = router;
