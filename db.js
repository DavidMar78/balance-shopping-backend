const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        shop TEXT,
        sum REAL,
        date INTEGER 
    )
`);

module.exports = db;