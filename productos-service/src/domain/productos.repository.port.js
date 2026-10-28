const METODOS = ['listar', 'buscarPorId', 'guardar', 'actualizar', 'eliminar'];

export const verificarRepositorio = (repositorio) => {
  for (const metodo of METODOS) {
    const faltaMetodo = typeof repositorio[metodo] !== 'function';

    if (faltaMetodo) {
      throw new Error('El repositorio debe tener el método ' + metodo);
    }
  }

  return repositorio;
};