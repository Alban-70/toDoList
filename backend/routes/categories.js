const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all(`SELECT * FROM Categorie
    ORDER BY 
      CASE WHEN nom_categorie = 'Toutes' THEN 0 ELSE 1 END,
      nom_categorie ASC`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
