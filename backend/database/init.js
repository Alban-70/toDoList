const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'todolist.sqlite');
const db = new sqlite3.Database(dbPath);


db.serialize(() => {


    db.run(``)


})