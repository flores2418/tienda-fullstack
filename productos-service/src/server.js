import { crearApp } from './app.js';
import { iniciarDb } from './infrastructure/db/sqlserver.js';
import { crearRepositorioSqlServer } from './infrastructure/db/productos.sqlserver.repository.js';
import { conectarRabbit, suscribir } from './infrastructure/mensajeria/rabbit.js';

const pool = await iniciarDb();
const repositorio = crearRepositorioSqlServer(pool);

await conectarRabbit(process.env.RABBIT_URL);

await suscribir('productos.usuarios', 'usuario.registrado', (usuario) => {
  console.log('Nuevo cliente registrado: ' + usuario.nombre);
});

const app = crearApp(repositorio);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('productos-service en el puerto ' + PORT);
});