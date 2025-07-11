import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationDataService {
  private readonly notificationMap = new Map<string, string>();

  createNotification(messageId: string, status: string): void {
    this.notificationMap.set(messageId, status);
  }

  getNotification(messageId: string): string | undefined {
    return this.notificationMap.get(messageId);
  }

  deleteNotification(messageId: string): boolean {
    return this.notificationMap.delete(messageId);
  }
}
