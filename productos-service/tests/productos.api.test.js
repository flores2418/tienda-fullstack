import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { crearApp } from '../src/app.js';
import { crearRepositorioMemoria } from '../src/infrastructure/db/productos.memoria.repository.js';

process.env.JWT_SECRET = 'secreto_de_prueba';

let app;
let token;

beforeAll(() => {
  const repositorio = crearRepositorioMemoria();
  app = crearApp(repositorio);
  token = jwt.sign({ id: '1', nombre: 'Flor' }, process.env.JWT_SECRET);
});

describe('API de productos', () => {
  it('GET /api/productos responde 200 con una lista', async () => {
    const respuesta = await request(app).get('/api/productos');

    expect(respuesta.status).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
  });

  it('POST /api/productos sin token responde 401', async () => {
    const respuesta = await request(app)
      .post('/api/productos')
      .send({ nombre: 'Camiseta', precio: 500 });

    expect(respuesta.status).toBe(401);
  });

  it('POST /api/productos con token responde 201', async () => {
    const respuesta = await request(app)
      .post('/api/productos')
      .set('Authorization', 'Bearer ' + token)
      .send({ nombre: 'Camiseta', precio: 500, stock: 10 });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.nombre).toBe('Camiseta');
  });

  it('GET /api/productos/:id de un producto que no existe responde 404', async () => {
    const respuesta = await request(app).get('/api/productos/999');

    expect(respuesta.status).toBe(404);
  });
});