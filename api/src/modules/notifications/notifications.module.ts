import { Logger, Module } from '@nestjs/common';
import { rmqClient } from '../../config/rabbitmq';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [rmqClient('fila.notificacao.entrada.elber')],
  controllers: [NotificationsController],
  providers: [NotificationsService, Logger],
})
export class NotificationsModule {}
