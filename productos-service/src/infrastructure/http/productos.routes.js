import { Router } from 'express';
import { verificarToken } from './verificarToken.js';

export const crearRutasProductos = (servicio) => {
  const router = Router();

  router.get('/', async (req, res) => {
    const productos = await servicio.listar();
    res.json(productos);
  });

  router.get('/:id', async (req, res) => {
    const producto = await servicio.obtener(req.params.id);
    res.json(producto);
  });

  router.post('/', verificarToken, async (req, res) => {
    const productoCreado = await servicio.crear(req.body);
    res.status(201).json(productoCreado);
  });

  router.put('/:id', verificarToken, async (req, res) => {
    const productoActualizado = await servicio.actualizar(req.params.id, req.body);
    res.json(productoActualizado);
  });

  router.delete('/:id', verificarToken, async (req, res) => {
    await servicio.eliminar(req.params.id);
    res.status(204).send();
  });

  return router;
};