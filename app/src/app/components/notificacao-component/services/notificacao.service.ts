import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NotificationInterface } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  sendMessage(
    payload: NotificationInterface
  ): Observable<{ mensagemId: string }> {
    return this.http.post<{ mensagemId: string }>(
      `${this.baseUrl}/v1/notificar`,
      payload
    );
  }

  getMessage(
    payload: NotificationInterface
  ): Observable<{ mensagemId: string }> {
    return this.http.post<{ mensagemId: string }>(
      `${this.baseUrl}/v1/notificar`,
      payload
    );
  }
}
