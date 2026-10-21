import { pool } from '../db/sqlserver.js';
export const listar = async (req, res) => {
const resultado = await pool.query('SELECT * FROM productos');
res.json(resultado.recordset);
} ;