import { ClientsModule, Transport } from '@nestjs/microservices';
export const rmqClient = (fila.notificacao.entrada.elber: string) =>
  ClientsModule.register([
    {
      name: fila.notificacao.entrada.elber,
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
        ],
        fila.notificacao.entrada.elber,
        prefetchCount: 1,
        noAck: true,
        fila.notificacao.entrada.elberOptions: {
          durable: true,
        },
      },
    },
  ]);

export const rmqConfig = (fila.notificacao.entrada.elber: string) => ({
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
    ],
    fila.notificacao.entrada.elber,
    prefetchCount: 1,
    noAck: true,
    fila.notificacao.entrada.elberOptions: {
      durable: true,
    },
  },
});
