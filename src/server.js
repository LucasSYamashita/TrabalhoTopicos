import express from "express";
import { getDb } from "./db.js";

const app = express();
app.use(express.json());

app.get("/", (_, res) => res.send("API Clientes ✅"));

app.get("/clientes", async(_req, res) => {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM clientes ORDER BY id DESC");
    res.json(rows);
});

app.post("/clientes", async(req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) return res.status(400).json({ erro: "nome e email são obrigatórios" });

    try {
        const db = await getDb();
        const r = await db.run("INSERT INTO clientes (nome, email) VALUES (?, ?)", [nome, email]);
        res.status(201).json({ id: r.lastID, nome, email });
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));