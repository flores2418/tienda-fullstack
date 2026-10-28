import { validarProducto } from '../domain/producto.js';
import { verificarRepositorio } from '../domain/productos.repository.port.js';

const crearError = (status, mensaje) => {
  const error = new Error(mensaje);
  error.status = status;
  return error;
};

export const crearServicioProductos = (repositorio) => {
  verificarRepositorio(repositorio);

  const listar = async () => {
    const productos = await repositorio.listar();
    return productos;
  };

  const obtener = async (id) => {
    const producto = await repositorio.buscarPorId(id);
    const noExiste = !producto;

    if (noExiste) {
      throw crearError(404, 'Producto no existe');
    }

    return producto;
  };

  const crear = async (datos) => {
    const errores = validarProducto(datos);
    const hayErrores = errores.length > 0;

    if (hayErrores) {
      throw crearError(400, errores.join('. '));
    }

    const stock = datos.stock ?? 0;
    const nuevoProducto = { nombre: datos.nombre, precio: datos.precio, stock: stock };
    const productoCreado = await repositorio.guardar(nuevoProducto);

    return productoCreado;
  };

  const actualizar = async (id, datos) => {
    const errores = validarProducto(datos);
    const hayErrores = errores.length > 0;

    if (hayErrores) {
      throw crearError(400, errores.join('. '));
    }

    const stock = datos.stock ?? 0;
    const cambios = { nombre: datos.nombre, precio: datos.precio, stock: stock };
    const productoActualizado = await repositorio.actualizar(id, cambios);
    const noExiste = !productoActualizado;

    if (noExiste) {
      throw crearError(404, 'Producto no existe');
    }

    return productoActualizado;
  };

  const eliminar = async (id) => {
    const seBorro = await repositorio.eliminar(id);
    const noExiste = !seBorro;

    if (noExiste) {
      throw crearError(404, 'Producto no existe');
    }
  };

  return { listar, obtener, crear, actualizar, eliminar };
};