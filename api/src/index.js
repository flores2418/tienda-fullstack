import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js';
import authRoutes from './routes/auth.routes.js';
import resenasRoutes from './routes/resenas.routes.js';
import { noEncontrado, errores } from './middlewares/errores.js';
import { conectarMongo } from './db/mongo.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resenas', resenasRoutes);

app.get('/api/salud', (req, res) => {
  const respuesta = { ok: true, mensaje: 'API funcionando' };
  res.json(respuesta);
});

// siempre despues de las rutas
app.use(noEncontrado);
app.use(errores);

await conectarMongo();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('API en http://localhost:' + PORT);
});