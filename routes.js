const express = require("express");
const ClienteDao = require("./clienteDao");
const router = express.Router();

router.post("/clientes", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const cliente = await ClienteDao.salvar(nome, email);
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/clientes", async (req, res) => {
  try {
    const clientes = await ClienteDao.listar();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
