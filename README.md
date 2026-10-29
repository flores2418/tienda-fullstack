# Tienda Full Stack

Proyecto de Talendig. Es una tienda con login de usuarios y manejo de productos.

Lo hice en dos partes:

- **Parte 1:** una sola API en Express con SQL Server y MongoDB, y un frontend en React.
- **Parte 2:** separé la API en microservicios, con un gateway, una base de datos para cada servicio, RabbitMQ, Docker y pruebas.

## Arquitectura

```
React (5173)
     |
Gateway (3000)
     |---------------------------|
auth-service (3001)      productos-service (3002)
     |                           |
  MongoDB                   SQL Server
     |                           |
     |------- RabbitMQ ----------|
```

- **Gateway:** es la única entrada. Recibe los pedidos y los manda al servicio que toca según la ruta.
- **auth-service:** registro y login. Guarda los usuarios en MongoDB y devuelve un token JWT.
- **productos-service:** el CRUD de productos en SQL Server. Crear, editar y borrar piden token.
- **RabbitMQ:** cuando alguien se registra, auth publica el evento `usuario.registrado` y productos-service lo recibe.

En productos-service usé arquitectura hexagonal:

- `domain`: las reglas del producto, sin depender de Express ni de la base de datos.
- `application`: los casos de uso (listar, crear, actualizar, eliminar).
- `infrastructure`: las rutas, la conexión a SQL Server y RabbitMQ.

Por eso en las pruebas puedo cambiar SQL Server por un repositorio en memoria sin tocar la lógica.

## Tecnologías

Node.js, Express, MongoDB con Mongoose, SQL Server con mssql, JWT, bcryptjs, RabbitMQ con amqplib, http-proxy-middleware, Docker, React, Vite, TanStack Query, React Router, Vitest, Supertest y React Testing Library.

## Cómo correrlo

1. Copiar `.env.example` como `.env` en la carpeta principal y poner una clave para SQL Server y un JWT_SECRET.
2. Prender el backend:

```
docker compose up -d --build
```

3. Prender el frontend:

```
cd frontend
npm install
npm run dev
```

4. Abrir `http://localhost:5173`

Para apagar el backend: `docker compose down`

El panel de RabbitMQ queda en `http://localhost:15672` (usuario y clave: guest).

## Rutas

Todas pasan por el gateway en `http://localhost:3000`

| Método | Ruta | Token |
|---|---|---|
| POST | /api/auth/registro | No |
| POST | /api/auth/login | No |
| GET | /api/productos | No |
| GET | /api/productos/:id | No |
| POST | /api/productos | Sí |
| PUT | /api/productos/:id | Sí |
| DELETE | /api/productos/:id | Sí |

El token se manda en el encabezado `Authorization: Bearer <token>`.

## Pruebas

Backend (pruebas unitarias y de integración con Supertest):

```
cd productos-service
npm install
npm test
```

Frontend (React Testing Library):

```
cd frontend
npm test
```