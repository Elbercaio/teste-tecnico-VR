import { Logger, Module } from '@nestjs/common';
import { rmqClient } from '../../config/rabbitmq';
import { NotificationStatusService } from './notification-status.service';
import { NotificationsController } from './notifications.controller';
import { NotificationGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    rmqClient('fila.notificacao.entrada.elber'),
    rmqClient('fila.notificacao.status.elber'),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    Logger,
    NotificationStatusService,
    NotificationGateway,
  ],
})
export class NotificationsModule {}
