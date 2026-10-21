import express from 'express';
import cors from 'cors';
import { pool } from './db/sqlserver.js'
import productosRoutes from './routes/productos.routes.js';

const app = express(); 
app.use(cors());
app.use(express.json()); 
app.use('/api/productos', productosRoutes);

app.get('/api/salud',(req,res)=> {
const respuesta = {ok: true, mensaje: 'API funcionando'};
res.json(respuesta);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
console.log('API en http://localhost:' + PORT);
});