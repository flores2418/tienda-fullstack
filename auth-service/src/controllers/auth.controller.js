import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model.js';
import { publicar } from '../rabbit.js';

export const registro = async (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;

  const faltanDatos = !nombre || !email || !password;

  if (faltanDatos) {
    return res.status(400).json({ mensaje: 'Nombre, email y contraseña son obligatorios' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, passwordHash });

  const usuarioCreado = { id: usuario.id, nombre: usuario.nombre, email: usuario.email };

  publicar('usuario.registrado', usuarioCreado);

  res.status(201).json(usuarioCreado);
};

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const faltanDatos = !email || !password;

  if (faltanDatos) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
  }

  const usuario = await Usuario.findOne({ email });
  const noExiste = !usuario;

  if (noExiste) {
    return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
  }

  const passwordCorrecta = await bcrypt.compare(password, usuario.passwordHash);
  const passwordIncorrecta = !passwordCorrecta;

  if (passwordIncorrecta) {
    return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
  }

  const datosDelToken = { id: usuario.id, nombre: usuario.nombre };
  const token = jwt.sign(datosDelToken, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({ token: token, nombre: usuario.nombre });
};