const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const { categorie } = req.query;  // GET query params

  let sql = `SELECT * FROM Tache`;
  const params = [];

  if (categorie) {
    if (categorie !== "Toutes") {
        sql += ` LEFT JOIN Categorie C ON Tache.id_categorie = C.id_categorie WHERE C.nom_categorie = ?`;
        params.push(categorie);
    }
  }

  sql += ` ORDER BY Tache.niveau_priorite ASC`;

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


module.exports = router;
