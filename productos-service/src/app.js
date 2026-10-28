import express from 'express';
import { crearServicioProductos } from './application/productos.service.js';
import { crearRutasProductos } from './infrastructure/http/productos.routes.js';
import { noEncontrado, errores } from './infrastructure/http/errores.js';

export const crearApp = (repositorio) => {
  const servicio = crearServicioProductos(repositorio);
  const rutas = crearRutasProductos(servicio);

  const app = express();
  app.use(express.json());

  app.use('/api/productos', rutas);

  app.get('/salud', (req, res) => {
    res.json({ servicio: 'productos', ok: true });
  });

  app.use(noEncontrado);
  app.use(errores);

  return app;
};