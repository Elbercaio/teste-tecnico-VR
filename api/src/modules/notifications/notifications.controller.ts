import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notificar')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Post()
  @HttpCode(202)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.service.create(createNotificationDto);
  }
}
