const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getAllProducts = async() => {
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
};

const createProduct = async({ name, price, quantity }) => {
    const res = await pool.query(
        'INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *', [name, price, quantity]
    );
    return res.rows[0];
};

module.exports = {
    getAllProducts,
    createProduct,
    pool, // exportado para fechar conexão nos testes
};