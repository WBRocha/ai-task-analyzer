import Database from "better-sqlite3";

const db = new Database("database.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL,
    dificuldade TEXT NOT NULL,
    proximo_passo TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;