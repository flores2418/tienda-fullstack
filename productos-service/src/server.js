import { crearApp } from './app.js';
import { iniciarDb } from './infrastructure/db/sqlserver.js';
import { crearRepositorioSqlServer } from './infrastructure/db/productos.sqlserver.repository.js';

const pool = await iniciarDb();
const repositorio = crearRepositorioSqlServer(pool);

const app = crearApp(repositorio);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('productos-service en el puerto ' + PORT);
});