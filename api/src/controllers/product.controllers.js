import { pool } from '../db/sqlserver.js';

// GET /api/productos → todos los productos
export const listar = async (req, res) => {
  const resultado = await pool.query('SELECT * FROM productos');
  const productos = resultado.recordset;

  res.json(productos);
};

// GET /api/productos/:id → un solo producto
export const obtener = async (req, res) => {
  const id = req.params.id;

  const resultado = await pool.request()
    .input('id', id)
    .query('SELECT * FROM productos WHERE id = @id');

  const producto = resultado.recordset[0];
  const noExiste = !producto;

  if (noExiste) {
    return res.status(404).json({ mensaje: 'Producto no existe' });
  }

  res.json(producto);
};

// POST /api/productos → crear un producto
export const crear = async (req, res) => {
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const stock = req.body.stock ?? 0;

  const faltanDatos = !nombre || precio === undefined;

  if (faltanDatos) {
    return res.status(400).json({ mensaje: 'Nombre y precio son obligatorios' });
  }

  const resultado = await pool.request()
    .input('nombre', nombre)
    .input('precio', precio)
    .input('stock', stock)
    .query(`INSERT INTO productos (nombre, precio, stock)
            OUTPUT INSERTED.*
            VALUES (@nombre, @precio, @stock)`);

  const productoCreado = resultado.recordset[0];

  res.status(201).json(productoCreado);
};

// PUT /api/productos/:id → actualizar un producto
export const actualizar = async (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const stock = req.body.stock ?? 0;

  const faltanDatos = !nombre || precio === undefined;

  if (faltanDatos) {
    return res.status(400).json({ mensaje: 'Nombre y precio son obligatorios' });
  }

  const resultado = await pool.request()
    .input('id', id)
    .input('nombre', nombre)
    .input('precio', precio)
    .input('stock', stock)
    .query(`UPDATE productos
            SET nombre = @nombre, precio = @precio, stock = @stock
            OUTPUT INSERTED.*
            WHERE id = @id`);

  const productoActualizado = resultado.recordset[0];
  const noExiste = !productoActualizado;

  if (noExiste) {
    return res.status(404).json({ mensaje: 'Producto no existe' });
  }

  res.json(productoActualizado);
};

// DELETE /api/productos/:id → borrar un producto
export const eliminar = async (req, res) => {
  const id = req.params.id;

  const resultado = await pool.request()
    .input('id', id)
    .query('DELETE FROM productos WHERE id = @id');

  const filasBorradas = resultado.rowsAffected[0];
  const noExiste = filasBorradas === 0;

  if (noExiste) {
    return res.status(404).json({ mensaje: 'Producto no existe' });
  }

  res.status(204).send();
};