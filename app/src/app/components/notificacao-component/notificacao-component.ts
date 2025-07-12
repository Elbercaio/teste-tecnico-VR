import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  NotificationInterface,
  NotificationStatusEnum,
} from './interfaces/notification.interface';
import { NotificacaoService } from './services/notificacao.service';

@Component({
  selector: 'app-notificacao-component',
  imports: [FormsModule],
  templateUrl: './notificacao-component.html',
  styleUrl: './notificacao-component.scss',
})
export class NotificacaoComponent implements OnInit, OnDestroy {
  conteudoMensagem: string = '';
  notifications: NotificationInterface[] = [];
  private checkIntervalSubscription?: Subscription;
  constructor(private service: NotificacaoService) {}
  ngOnInit(): void {
    this.checkIntervalSubscription = interval(5000).subscribe(() => {
      this.checkPendingNotifications();
    });
  }

  ngOnDestroy(): void {
    if (this.checkIntervalSubscription) {
      this.checkIntervalSubscription.unsubscribe();
    }
  }

  private checkPendingNotifications(): void {
    const pendingNotifications = this.notifications.filter(
      (notification) => notification.status === NotificationStatusEnum.PENDENTE
    );

    pendingNotifications.forEach((notification) => {
      this.service.getMessage(notification.mensagemId).subscribe(
        (updatedNotification) => {
          this.updateNotificationStatus(
            notification.mensagemId,
            updatedNotification.status
          );
        },
        (error) => {
          console.error(
            `Erro ao verificar mensagem ${notification.mensagemId}:`,
            error
          );
        }
      );
    });
  }

  sendMessage(): void {
    const id: string = uuidv4();
    const notification: NotificationInterface = {
      mensagemId: id,
      conteudoMensagem: this.conteudoMensagem,
    };
    this.service.sendMessage(notification).subscribe(
      () => {
        this.notifications.unshift({
          ...notification,
          status: NotificationStatusEnum.PENDENTE,
        });
      },
      (error: Error) =>
        console.error(
          `Erro ao enviar mensagem ${this.conteudoMensagem}:`,
          error
        )
    );
    this.conteudoMensagem = '';
  }

  private updateNotificationStatus(
    mensagemId: string,
    newStatus: NotificationStatusEnum
  ): void {
    const index = this.notifications.findIndex(
      (n) => n.mensagemId === mensagemId
    );
    if (index !== -1) {
      this.notifications[index] = {
        ...this.notifications[index],
        status: newStatus,
      };
    }
  }
}
