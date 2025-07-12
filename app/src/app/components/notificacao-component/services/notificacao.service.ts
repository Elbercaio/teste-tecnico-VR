import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  NotificationInterface,
  NotificationStatusEnum,
} from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  sendMessage(
    payload: NotificationInterface
  ): Observable<{ mensagemId: string }> {
    return this.http.post<{ mensagemId: string }>(
      `${this.apiURL}/v1/notificar`,
      payload
    );
  }

  getMessage(
    mensagemId: string
  ): Observable<{ status: NotificationStatusEnum }> {
    return this.http.get<{ status: NotificationStatusEnum }>(
      `${this.apiURL}/v1/notificar/${mensagemId}`
    );
  }
}
