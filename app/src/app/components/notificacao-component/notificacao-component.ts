import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
export class NotificacaoComponent {
  conteudoMensagem: string = '';
  notifications: NotificationInterface[] = [];
  constructor(private service: NotificacaoService) {}

  sendMessage(): void {
    const id: string = uuidv4();
    const notification: NotificationInterface = {
      mensagemId: id,
      conteudoMensagem: this.conteudoMensagem,
    };
    this.service.sendMessage(notification).subscribe(() => {
      () => {
        this.notifications.unshift({
          ...notification,
          status: NotificationStatusEnum.PENDENTE,
        });
      };
      (error: Error) => console.error(error);
    });
    this.conteudoMensagem = '';
  }
}
