import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  @Inject('fila.notificacao.entrada.elber') private queueClient: ClientProxy;

  create(createNotificationDto: CreateNotificationDto): string | undefined {
    try {
      this.queueClient.emit<void>('QUEUE', createNotificationDto);
      return createNotificationDto.mensagemId;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
