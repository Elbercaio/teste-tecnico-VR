import { TestBed } from '@suites/unit';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockInputQueue = { emit: jest.fn() };
  const mockStatusQueue = { emit: jest.fn() };

  beforeAll(async () => {
    const { unit } = await TestBed.solitary(NotificationsService)
      .mock('fila.notificacao.entrada.elber')
      .final(mockInputQueue)
      .mock('fila.notificacao.status.elber')
      .final(mockStatusQueue)
      .compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should emit notification', () => {
    const payload = {
      mensagemId: '12031452-a7bb-40bc-9e12-9d2605b301c5',
      conteudoMensagem: 'Mensagem de teste',
    };
    service.create(payload);
    expect(mockInputQueue.emit).toHaveBeenCalledWith(
      'fila.notificacao.entrada.elber',
      payload,
    );
  });

  it('should emit status', async () => {
    const payload = {
      mensagemId: '12031452-a7bb-40bc-9e12-9d2605b301c5',
      conteudoMensagem: 'Mensagem de teste',
    };
    await service.handleInputMessage(payload);
    expect(mockStatusQueue.emit).toHaveBeenCalledWith(
      'fila.notificacao.status.elber',
      expect.objectContaining({ mensagemId: payload.mensagemId }),
    );
  });
});
