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

export const suscribir = async (cola, evento, manejador) => {
  await canal.assertQueue(cola);
  await canal.bindQueue(cola, EXCHANGE, evento);

  canal.consume(cola, async (mensaje) => {
    const datos = JSON.parse(mensaje.content.toString());
    console.log('Recibido: ' + evento);

    try {
      await manejador(datos);
      canal.ack(mensaje);
    } catch (error) {
      console.error(error);
      canal.nack(mensaje, false, false);
    }
  });
};