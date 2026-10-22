// Se ejecuta cuando alguien pide una dirección que no existe
export const noEncontrado = (req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
};

// Atrapa cualquier error de la API. Tiene 4 parámetros:
// Express sabe que es el middleware de errores
export const errores = (err, req, res, next) => {
  // El detalle del error se muestra en la terminal, no al cliente
  console.error(err);

  // 400: el JSON que llegó está mal escrito
  const jsonMalEscrito = err.type === 'entity.parse.failed';

  // 400: SQL Server no pudo convertir el dato (un id que no es número)
  const datoInvalido = err.number === 245 || err.number === 8114;

  // 409: se intentó guardar algo repetido (email que ya existe)
  const datoRepetido = err.number === 2627 || err.number === 2601;

  if (jsonMalEscrito || datoInvalido) {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  if (datoRepetido) {
    return res.status(409).json({ mensaje: 'Ese dato ya existe' });
  }

  // 401 y otros: si el error ya trae su código, lo usamos
  const codigo = err.status || 500;

  if (codigo === 500) {
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

  res.status(codigo).json({ mensaje: err.message });
};