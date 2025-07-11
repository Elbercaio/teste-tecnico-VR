export enum NotificationStatusEnum {
  PENDENTE = 'AGUARDANDO PROCESSAMENTO',
  SUCESSO = 'PROCESSADO_SUCESSO',
  FALHA = 'FALHA_PROCESSAMENTO',
}

export interface NotificationInterface {
  mensagemId: string;
  conteudoMensagem: string;
  status?: NotificationStatusEnum;
}
