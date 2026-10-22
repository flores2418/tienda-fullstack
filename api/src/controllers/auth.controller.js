import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db/sqlserver.js';

// POST /api/auth/registro
export const registro = async (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;

  const faltanDatos = !nombre || !email || !password;

  if (faltanDatos) {
    return res.status(400).json({ mensaje: 'Nombre, email y contraseña son obligatorios' });
  }

  // guardo el hash, no la contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  const resultado = await pool.request()
    .input('nombre', nombre)
    .input('email', email)
    .input('passwordHash', passwordHash)
    .query(`INSERT INTO usuarios (nombre, email, password_hash)
            OUTPUT INSERTED.id, INSERTED.nombre, INSERTED.email
            VALUES (@nombre, @email, @passwordHash)`);

  const usuarioCreado = resultado.recordset[0];

  res.status(201).json(usuarioCreado);
};

// POST /api/auth/login
export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const faltanDatos = !email || !password;

  if (faltanDatos) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
  }

  const resultado = await pool.request()
    .input('email', email)
    .query('SELECT * FROM usuarios WHERE email = @email');

  const usuario = resultado.recordset[0];
  const noExiste = !usuario;

  if (noExiste) {
    return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
  }

  const passwordCorrecta = await bcrypt.compare(password, usuario.password_hash);
  const passwordIncorrecta = !passwordCorrecta;

  if (passwordIncorrecta) {
    return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
  }

  const datosDelToken = { id: usuario.id, nombre: usuario.nombre };
  const token = jwt.sign(datosDelToken, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({ token: token, nombre: usuario.nombre });
};