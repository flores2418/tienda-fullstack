import sql from 'mssql';
import { reintentar } from '../mensajeria/reintentar.js';

const configuracion = {
  server: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: { trustServerCertificate: true },
};

const crearTabla = `
  IF OBJECT_ID('productos') IS NULL
  BEGIN
    CREATE TABLE productos (
      id INT IDENTITY(1,1) PRIMARY KEY,
      nombre NVARCHAR(100) NOT NULL,
      precio DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL DEFAULT 0
    );
    INSERT INTO productos (nombre, precio, stock) VALUES
      (N'Camiseta', 500, 10),
      (N'Pantalón', 1200, 5),
      (N'Zapatos', 1500, 3);
  END
`;

export const iniciarDb = async () => {
  const master = await reintentar('SQL Server', () => {
    return new sql.ConnectionPool(configuracion).connect();
  });

  await master.query("IF DB_ID('productos_db') IS NULL CREATE DATABASE productos_db");
  await master.close();

  const configuracionProductos = { ...configuracion, database: 'productos_db' };
  const pool = await new sql.ConnectionPool(configuracionProductos).connect();
  await pool.query(crearTabla);

  console.log('Conectado a SQL Server de productos');
  return pool;
};