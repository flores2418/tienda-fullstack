import mongoose from 'mongoose';
import { crearApp } from './app.js';
import { reintentar } from './reintentar.js';

await reintentar('MongoDB', () => mongoose.connect(process.env.MONGO_URI));
console.log('Conectado a MongoDB de auth');

const app = crearApp();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('auth-service en el puerto ' + PORT);
});