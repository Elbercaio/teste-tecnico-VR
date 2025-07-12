import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationStatusInterface } from './interfaces/notification-status.interface';
import { NotificationStatusService } from './notification-status.service';
import { NotificationsService } from './notifications.service';

@Controller('notificar')
@UseInterceptors(ClassSerializerInterceptor)
export class NotificationsController {
  constructor(
    private readonly service: NotificationsService,
    private readonly statusService: NotificationStatusService,
  ) {}
  @Get(':mensagemId')
  @HttpCode(202)
  findOne(@Param('mensagemId') mensagemId: string): {
    status: string | undefined;
  } {
    const status = this.statusService.getNotification(mensagemId);
    return { status };
  }

  @Post()
  @HttpCode(202)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.service.create(createNotificationDto);
  }

  @MessagePattern('fila.notificacao.entrada.elber')
  async handleInputQueue(
    @Payload() payload: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.handleInputMessage(payload);
    } catch {
      channel.nack(originalMsg, false, false);
    }
  }

  @MessagePattern('fila.notificacao.status.elber')
  handletatusQueue(
    @Payload() payload: NotificationStatusInterface,
    @Ctx() context: RmqContext,
  ): void {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.service.handleStatusMessage(payload);
    } catch {
      channel.nack(originalMsg, false, false);
    }
  }
}
