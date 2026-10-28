const convertirId = (id) => {
  const numero = Number(id);
  const esValido = Number.isInteger(numero);

  if (esValido) {
    return numero;
  }

  return null;
};

export const crearRepositorioSqlServer = (pool) => {
  const listar = async () => {
    const resultado = await pool.query('SELECT * FROM productos');
    return resultado.recordset;
  };

  const buscarPorId = async (id) => {
    const numero = convertirId(id);

    if (numero === null) {
      return null;
    }

    const resultado = await pool.request()
      .input('id', numero)
      .query('SELECT * FROM productos WHERE id = @id');

    return resultado.recordset[0] || null;
  };

  const guardar = async (datos) => {
    const resultado = await pool.request()
      .input('nombre', datos.nombre)
      .input('precio', datos.precio)
      .input('stock', datos.stock)
      .query(`INSERT INTO productos (nombre, precio, stock)
              OUTPUT INSERTED.*
              VALUES (@nombre, @precio, @stock)`);

    return resultado.recordset[0];
  };

  const actualizar = async (id, cambios) => {
    const numero = convertirId(id);

    if (numero === null) {
      return null;
    }

    const resultado = await pool.request()
      .input('id', numero)
      .input('nombre', cambios.nombre)
      .input('precio', cambios.precio)
      .input('stock', cambios.stock)
      .query(`UPDATE productos
              SET nombre = @nombre, precio = @precio, stock = @stock
              OUTPUT INSERTED.*
              WHERE id = @id`);

    return resultado.recordset[0] || null;
  };

  const eliminar = async (id) => {
    const numero = convertirId(id);

    if (numero === null) {
      return false;
    }

    const resultado = await pool.request()
      .input('id', numero)
      .query('DELETE FROM productos WHERE id = @id');

    const filasBorradas = resultado.rowsAffected[0];
    return filasBorradas > 0;
  };

  return { listar, buscarPorId, guardar, actualizar, eliminar };
};