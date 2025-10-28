// init.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Définir le chemin de la base de données
const dbPath = path.resolve(__dirname, 'todolist.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // --- CATEGORIES ---
  db.run(`CREATE TABLE IF NOT EXISTS Categorie (
    id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_categorie VARCHAR(50)
  )`);

  // --- TACHES ---
  db.run(`CREATE TABLE IF NOT EXISTS Tache (
    id_tache INTEGER PRIMARY KEY AUTOINCREMENT,
    id_categorie INTEGER,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    priorite VARCHAR(10), -- basse / moyenne / haute
    niveau_priorite INTEGER, -- 1 = basse, 2 = moyenne, 3 = haute
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_echeance DATETIME,
    statut VARCHAR(20) DEFAULT 'à faire',
    FOREIGN KEY (id_categorie) REFERENCES Categorie(id_categorie)
  )`);

  // --- SOUS-TACHES ---
  db.run(`CREATE TABLE IF NOT EXISTS SousTache (
    id_sous_tache INTEGER PRIMARY KEY AUTOINCREMENT,
    id_tache INTEGER NOT NULL,
    titre VARCHAR(100),
    statut VARCHAR(20) DEFAULT 'à faire',
    FOREIGN KEY (id_tache) REFERENCES Tache(id_tache)
  )`);

  // --- INSERTIONS PAR DÉFAUT ---
  db.run(`INSERT INTO Categorie (nom_categorie) VALUES 
    ('Personnel'),
    ('Travail'),
    ('Courses'),
    ('Études')
  `);

  db.run(`INSERT INTO Tache (id_categorie, titre, description, priorite, niveau_priorite, date_echeance, statut) VALUES
    (1, 'Aller courir', 'Faire 5 km dans le parc', 'moyenne', 2, '2025-10-25', 'à faire'),
    (2, 'Préparer la réunion', 'Rassembler les documents pour la réunion de lundi', 'haute', 1, '2025-10-24', 'en cours'),
    (3, 'Acheter du lait', 'Ne pas oublier le lait et le pain', 'basse', 3, '2025-10-23', 'à faire'),
    (4, 'Réviser JavaScript', 'Faire des exercices sur les promesses et async/await', 'haute', 1, '2025-10-28', 'à faire')
  `);

  db.run(`INSERT INTO SousTache (id_tache, titre, statut) VALUES
    (1, 'S’étirer avant de courir', 'terminée'),
    (1, 'Courir 5 km', 'en cours'),
    (2, 'Écrire le plan de présentation', 'en cours'),
    (3, 'Aller au supermarché', 'à faire'),
    (4, 'Relire les notes du cours', 'à faire')
  `);
});

console.log('✅ Base SQLite ToDoList initialisée avec catégories, tâches et sous-tâches !');
