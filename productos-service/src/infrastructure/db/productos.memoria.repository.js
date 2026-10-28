export const crearRepositorioMemoria = () => {
  const productos = [];
  let siguienteId = 1;

  const buscar = (id) => {
    const numero = Number(id);
    return productos.find((p) => p.id === numero);
  };

  const listar = async () => {
    return productos;
  };

  const buscarPorId = async (id) => {
    const producto = buscar(id);
    return producto || null;
  };

  const guardar = async (datos) => {
    const producto = { id: siguienteId, ...datos };
    siguienteId = siguienteId + 1;
    productos.push(producto);
    return producto;
  };

  const actualizar = async (id, cambios) => {
    const producto = buscar(id);
    const noExiste = !producto;

    if (noExiste) {
      return null;
    }

    Object.assign(producto, cambios);
    return producto;
  };

  const eliminar = async (id) => {
    const producto = buscar(id);
    const noExiste = !producto;

    if (noExiste) {
      return false;
    }

    const posicion = productos.indexOf(producto);
    productos.splice(posicion, 1);
    return true;
  };

  return { listar, buscarPorId, guardar, actualizar, eliminar };
};