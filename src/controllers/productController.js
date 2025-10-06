const Product = require('../models/productModel');

const getProducts = async(req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

const addProduct = async(req, res) => {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }
    try {
        const newProduct = await Product.createProduct({ name, price, quantity });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
};

module.exports = {
    getProducts,
    addProduct,
};