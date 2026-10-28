export const noEncontrado = (req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
};

export const errores = (err, req, res, next) => {
  const jsonMalEscrito = err.type === 'entity.parse.failed';

  if (jsonMalEscrito) {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  const codigo = err.status || 500;

  if (codigo === 500) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

  res.status(codigo).json({ mensaje: err.message });
};