const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/show", (req, res) => {
  const { categorie, titre } = req.query;  // GET query params

  let sql = `SELECT * FROM Tache`;
  const params = [];

  if (categorie && categorie !== "Toutes") {
    sql += ` LEFT JOIN Categorie C ON Tache.id_categorie = C.id_categorie WHERE C.nom_categorie = ?`;
    params.push(categorie);
  }

  if (titre) {
    // Si on avait déjà un WHERE pour la catégorie, on ajoute AND, sinon WHERE
    sql += categorie && categorie !== "Toutes" ? ` AND` : ` WHERE`;
    sql += ` Tache.titre LIKE ?`;
    params.push(`%${titre}%`);
  }

  sql += ` ORDER BY Tache.niveau_priorite ASC`;

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/add", (req, res) => {
  const { titre, description, priorite, date_echeance, id_categorie } = req.body;

  if (!titre || !priorite || !id_categorie) {
    return res.status(400).json({ error: "Titre, priorité et catégorie sont obligatoires" });
  }

  const prioriteMap = { Basse: 1, Moyenne: 2, Haute: 3 };

  const sql = `
    INSERT INTO Tache (titre, description, priorite, niveau_priorite, date_echeance, id_categorie, statut)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    titre,
    description || null,
    priorite,
    prioriteMap[priorite],
    date_echeance || null,
    id_categorie,
    "En cours" // statut par défaut
  ];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id_tache: this.lastID, message: "Tâche ajoutée avec succès" });
  });
});


module.exports = router;
