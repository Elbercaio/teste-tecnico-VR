import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationStatusService {
  private readonly notificationMap = new Map<string, string>();

  createNotification(mensagemId: string, status: string): void {
    this.notificationMap.set(mensagemId, status);
  }

  getNotification(mensagemId: string): string | undefined {
    return this.notificationMap.get(mensagemId);
  }

  deleteNotification(mensagemId: string): boolean {
    return this.notificationMap.delete(mensagemId);
  }
}
