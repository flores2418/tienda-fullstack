const API = 'http://localhost:3000/api';

export const api = async (ruta, opciones = {}) => {
  const token = localStorage.getItem('token');

  const encabezados = { 'Content-Type': 'application/json' };

  if (token) {
    encabezados.Authorization = 'Bearer ' + token;
  }

  const respuesta = await fetch(API + ruta, { ...opciones, headers: encabezados });

  
  if (respuesta.status === 204) {
    return null;
  }

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje);
  }

  return datos;
};