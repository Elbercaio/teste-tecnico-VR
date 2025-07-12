import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { NotificationInterface } from '../interfaces/notification.interface';
import { NotificacaoService } from './notificacao.service';

describe('NotificacaoService', () => {
  let service: NotificacaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        NotificacaoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(NotificacaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a message', () => {
    const mockPayload: NotificationInterface = {
      mensagemId: 'e6c3f91b-8e3c-4457-92d1-318964178dd0',
      conteudoMensagem: 'Mensagem Teste',
    };
    service.sendMessage(mockPayload).subscribe((response) => {
      expect(response).toEqual({ 
      mensagemId: 'e6c3f91b-8e3c-4457-92d1-318964178dd0', });
    });
  });
});
