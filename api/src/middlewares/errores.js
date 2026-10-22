// 404 si ninguna ruta coincide
export const noEncontrado = (req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
};

export const errores = (err, req, res, next) => {
  console.error(err);

  const jsonMalEscrito = err.type === 'entity.parse.failed';
  const datoInvalido = err.number === 245 || err.number === 8114;

  // 2627 y 2601 = dato repetido en una columna UNIQUE
  const datoRepetido = err.number === 2627 || err.number === 2601;

  if (jsonMalEscrito || datoInvalido) {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  if (datoRepetido) {
    return res.status(409).json({ mensaje: 'Ese dato ya existe' });
  }

  const codigo = err.status || 500;

  if (codigo === 500) {
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

  res.status(codigo).json({ mensaje: err.message });
};