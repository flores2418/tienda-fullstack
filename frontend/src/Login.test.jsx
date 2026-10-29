import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login.jsx';

const mostrarLogin = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Página de login', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el título, los campos y el botón', () => {
    mostrarLogin();

    expect(screen.getByText('Iniciar sesión')).toBeDefined();
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
    expect(screen.getByPlaceholderText('Contraseña')).toBeDefined();
    expect(screen.getByText('Entrar')).toBeDefined();
  });

  it('guarda lo que el usuario escribe en el email', () => {
    mostrarLogin();

    const campoEmail = screen.getByPlaceholderText('Email');
    fireEvent.change(campoEmail, { target: { value: 'flor@mail.com' } });

    expect(campoEmail.value).toBe('flor@mail.com');
  });
});