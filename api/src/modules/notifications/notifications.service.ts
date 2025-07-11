import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  @Inject('fila.notificacao.entrada.elber') private queueClient: ClientProxy;
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }
}
