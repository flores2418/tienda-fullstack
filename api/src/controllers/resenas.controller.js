import { Resena } from '../models/resena.model.js';

// GET /api/resenas?productoId=1
export const listar = async (req, res) => {
  const filtro = {};

  if (req.query.productoId) {
    filtro.productoId = Number(req.query.productoId);
  }

  const resenas = await Resena.find(filtro).sort({ createdAt: -1 });

  res.json(resenas);
};

// POST /api/resenas
export const crear = async (req, res) => {
  const resenaCreada = await Resena.create(req.body);

  res.status(201).json(resenaCreada);
};