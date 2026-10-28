import mongoose from 'mongoose';
import { crearApp } from './app.js';
import { conectarRabbit } from './rabbit.js';
import { reintentar } from './reintentar.js';

await reintentar('MongoDB', () => mongoose.connect(process.env.MONGO_URI));
console.log('Conectado a MongoDB de auth');

await conectarRabbit(process.env.RABBIT_URL);

const app = crearApp();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('auth-service en el puerto ' + PORT);
});