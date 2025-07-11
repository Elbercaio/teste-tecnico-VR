import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationStatusService } from './notification-status.service';

@WebSocketGateway({
  path: '/api/socket.io',
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
  pingInterval: 6000,
  pingTimeout: 12000,
})
export class NotificationGateway {
  constructor(private service: NotificationStatusService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notification')
  generateReport(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { messageId: string },
  ): void {
    try {
      const status = this.service.getNotification(body.messageId);

      client.emit('notification-response', status);
    } catch (error) {
      client.emit('notification-report-error', {
        error,
      });
    }
  }
}
