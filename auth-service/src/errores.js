export const noEncontrado = (req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
};

export const errores = (err, req, res, next) => {
  console.error(err);

  const jsonMalEscrito = err.type === 'entity.parse.failed';
  const validacionMongo = err.name === 'ValidationError';
  const emailRepetido = err.code === 11000;

  if (jsonMalEscrito || validacionMongo) {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  if (emailRepetido) {
    return res.status(409).json({ mensaje: 'Ese email ya está registrado' });
  }

  res.status(500).json({ mensaje: 'Error interno del servidor' });
};