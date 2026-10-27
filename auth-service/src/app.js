import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { noEncontrado, errores } from './errores.js';

export const crearApp = () => {
  const app = express();
  app.use(express.json());

  app.use('/api/auth', authRoutes);

  app.get('/salud', (req, res) => {
    res.json({ servicio: 'auth', ok: true });
  });

  app.use(noEncontrado);
  app.use(errores);

  return app;
};