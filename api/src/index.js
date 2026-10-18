import express from 'express';
import cors from 'cors';

const app = express(); 
app.use(cors());
app.use(express.json()); 

app.get('/api/salud',(req,res)=> {
const respuesta = {ok: true, mensaje: 'API funcionando'};
res.json(respuesta);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
console.log('API en http://localhost:' + PORT);
});