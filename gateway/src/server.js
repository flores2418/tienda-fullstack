import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const AUTH_URL = process.env.AUTH_URL;
const PRODUCTOS_URL = process.env.PRODUCTOS_URL;

const app = express();
app.use(cors());

const proxyAuth = createProxyMiddleware({
  target: AUTH_URL + '/api/auth',
  changeOrigin: true,
});

const proxyProductos = createProxyMiddleware({
  target: PRODUCTOS_URL + '/api/productos',
  changeOrigin: true,
});

app.use('/api/auth', proxyAuth);
app.use('/api/productos', proxyProductos);

app.get('/salud', (req, res) => {
  res.json({ servicio: 'gateway', ok: true });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Gateway en el puerto ' + PORT);
});