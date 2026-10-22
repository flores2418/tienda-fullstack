import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export default function Productos() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const usuario = localStorage.getItem('nombre');

  const productos = useQuery({
    queryKey: ['productos'],
    queryFn: () => api('/productos'),
  });

  const crear = useMutation({
    mutationFn: (nuevo) => api('/productos', {
      method: 'POST',
      body: JSON.stringify(nuevo),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
      setNombre('');
      setPrecio('');
    },
  });

  const agregar = (e) => {
    e.preventDefault();
    const nuevoProducto = { nombre: nombre, precio: Number(precio) };
    crear.mutate(nuevoProducto);
  };

  const salir = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    navigate('/login');
  };

  if (productos.isPending) {
    return <p>Cargando...</p>;
  }

  if (productos.isError) {
    return <p>Error: {productos.error.message}</p>;
  }

  const lista = productos.data;

  return (
    <main>
      <h1>Productos</h1>
      <p>Hola, {usuario}</p>
      <button onClick={salir}>Cerrar sesión</button>

      <form onSubmit={agregar}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button type="submit" disabled={crear.isPending}>
          Agregar
        </button>
      </form>

      {crear.isError && <p>{crear.error.message}</p>}

      <ul>
        {lista.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - RD$ {producto.precio}
          </li>
        ))}
      </ul>
    </main>
  );
}