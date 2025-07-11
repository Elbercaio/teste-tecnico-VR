import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { rmqClient } from './config/rabbitmq';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [NotificationsModule, rmqClient('fila.notificacao.entrada.elber')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
