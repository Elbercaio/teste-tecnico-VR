import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
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
import { NotificationsService } from './notifications.service';

@Controller('notificar')
@UseInterceptors(ClassSerializerInterceptor)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

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
    console.log('\n \n NotificationsController \n payload:', payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('\n \n NotificationsController \n originalMsg:', originalMsg);
    try {
      await this.service.handleInputMessage(payload);
      channel.ack(originalMsg);
    } catch {
      channel.nack(originalMsg);
    }
  }

  @MessagePattern('fila.notificacao.status.elber')
  handletatusQueue(
    @Payload() payload: NotificationStatusInterface,
    @Ctx() context: RmqContext,
  ): void {
    console.log('\n \n NotificationsController \n payload:', payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.service.handleStatusMessage(payload);
      channel.ack(originalMsg);
    } catch {
      channel.nack(originalMsg);
    }
  }
}
