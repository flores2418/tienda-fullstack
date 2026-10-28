import amqp from 'amqplib';
import { reintentar } from './reintentar.js';

const EXCHANGE = 'tienda';
let canal;

export const conectarRabbit = async (url) => {
  const conexion = await reintentar('RabbitMQ', () => amqp.connect(url));
  canal = await conexion.createChannel();
  await canal.assertExchange(EXCHANGE, 'topic');
  console.log('Conectado a RabbitMQ');
};

export const publicar = (evento, datos) => {
  const cuerpo = Buffer.from(JSON.stringify(datos));
  canal.publish(EXCHANGE, evento, cuerpo);
  console.log('Publicado: ' + evento);
};