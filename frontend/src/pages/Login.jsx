import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: (datos) => api('/auth/login', {
      method: 'POST',
      body: JSON.stringify(datos),
    }),
    onSuccess: (respuesta) => {
      localStorage.setItem('token', respuesta.token);
      localStorage.setItem('nombre', respuesta.nombre);
      navigate('/');
    },
  });

  const enviar = (e) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  const textoBoton = login.isPending ? 'Entrando...' : 'Entrar';

  return (
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={enviar}>
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
        <button type="submit" disabled={login.isPending}>
          {textoBoton}
        </button>
      </form>

      {login.isError && <p>{login.error.message}</p>}

      <p>
        ¿No tienes cuenta? <Link to="/registro">Crea una</Link>
      </p>
    </main>
  );
}