import { Logger, Module } from '@nestjs/common';
import { rmqClient } from '../../config/rabbitmq';
import { NotificationDataService } from './notification-data.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    rmqClient('fila.notificacao.entrada.elber'),
    rmqClient('fila.notificacao.status.elber'),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, Logger, NotificationDataService],
})
export class NotificationsModule {}
