import { ClientsModule, Transport } from '@nestjs/microservices';
export const rmqClient = (queue: string) =>
  ClientsModule.register([
    {
      name: queue,
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
        ],
        queue,
        prefetchCount: 1,
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    },
  ]);

export const rmqConfig = (queue: string) => ({
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
    ],
    queue,
    prefetchCount: 1,
    noAck: true,
    queueOptions: {
      durable: true,
    },
  },
});
