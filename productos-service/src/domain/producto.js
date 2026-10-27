export const validarProducto = (datos) => {
  const errores = [];

  const nombreInvalido = typeof datos.nombre !== 'string' || datos.nombre.trim() === '';
  const precioInvalido = typeof datos.precio !== 'number' || datos.precio < 0;
  const hayStock = datos.stock !== undefined;
  const stockInvalido = hayStock && (!Number.isInteger(datos.stock) || datos.stock < 0);

  if (nombreInvalido) {
    errores.push('El nombre es obligatorio');
  }

  if (precioInvalido) {
    errores.push('El precio debe ser un número mayor o igual a 0');
  }

  if (stockInvalido) {
    errores.push('El stock debe ser un número entero mayor o igual a 0');
  }

  return errores;
};