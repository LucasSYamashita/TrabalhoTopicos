const db = require("./db");

class ClienteDao {
  static salvar(nome, email) {
    return new Promise((resolve, reject) => {
      if (!nome || !email) return reject(new Error("Nome e email obrigatórios"));

      const stmt = db.prepare("INSERT INTO clientes (nome, email) VALUES (?, ?)");
      stmt.run([nome, email], function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, nome, email });
      });
      stmt.finalize();
    });
  }

  static listar() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM clientes", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static limpar() {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM clientes", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = ClienteDao;
