import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationStatusInterface } from './interfaces/notification-status.interface';
import { NotificationStatusService } from './notification-status.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    @Inject('fila.notificacao.entrada.elber') private inputQueue: ClientProxy,
    @Inject('fila.notificacao.status.elber') private statusQueue: ClientProxy,
    private readonly dataService: NotificationStatusService,
  ) {}

  create(createNotificationDto: CreateNotificationDto): string | undefined {
    try {
      this.inputQueue.emit<void>(
        'fila.notificacao.entrada.elber',
        createNotificationDto,
      );
      return createNotificationDto.mensagemId;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async handleInputMessage(payload: CreateNotificationDto): Promise<void> {
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );
      const randomNumber = Math.floor(Math.random() * 10);

      this.statusQueue.emit<void>('fila.notificacao.status.elber', {
        mensagemId: payload.mensagemId,
        status: randomNumber > 2 ? 'PROCESSADO_SUCESSO' : 'FALHA_PROCESSAMENTO',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  handleStatusMessage(payload: NotificationStatusInterface): void {
    try {
      this.dataService.createNotification(payload.mensagemId, payload.status);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
