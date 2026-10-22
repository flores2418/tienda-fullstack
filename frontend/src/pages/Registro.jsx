import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registro = useMutation({
    mutationFn: (datos) => api('/auth/registro', {
      method: 'POST',
      body: JSON.stringify(datos),
    }),
    onSuccess: () => {
      navigate('/login');
    },
  });

  const enviar = (e) => {
    e.preventDefault();
    registro.mutate({ nombre, email, password });
  };

  const textoBoton = registro.isPending ? 'Creando...' : 'Crear cuenta';

  return (
    <main>
      <h1>Crear cuenta</h1>

      <form onSubmit={enviar}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={registro.isPending}>
          {textoBoton}
        </button>
      </form>

      {registro.isError && <p>{registro.error.message}</p>}

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  );
}