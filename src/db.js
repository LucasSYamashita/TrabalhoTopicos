import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function getDb() {
    const db = await open({
        filename: "./data.db",
        driver: sqlite3.Database,
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS clientes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `);
    return db;
}