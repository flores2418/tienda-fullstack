const esperar = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const reintentar = async (nombre, conectar, intentos = 15) => {
  for (let intento = 1; intento <= intentos; intento++) {
    try {
      const conexion = await conectar();
      return conexion;
    } catch (error) {
      console.log(nombre + ' no está listo, intento ' + intento);
      await esperar(3000);
    }
  }

  throw new Error('No se pudo conectar a ' + nombre);
};