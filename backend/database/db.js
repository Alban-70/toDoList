const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, 'todolist.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Erreur ouverture DB :', err.message);
  else console.log('✅ Base SQLite ouverte !');
});

module.exports = db;
