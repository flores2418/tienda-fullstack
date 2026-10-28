import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const encabezado = req.headers.authorization;
  const noHayToken = !encabezado;

  if (noHayToken) {
    return res.status(401).json({ mensaje: 'Necesitas iniciar sesión' });
  }

  const partes = encabezado.split(' ');
  const token = partes[1];

  try {
    const datosDelUsuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = datosDelUsuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o vencido' });
  }
};