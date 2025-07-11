import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID('4', { message: 'O ID da mensagem deve ser UUID.' })
  mensagemId: string;

  @IsNotEmpty({ message: 'O conteúdo da mensagem não pode estar vazio.' })
  @IsString({ message: 'O conteúdo da mensagem deve ser uma string.' })
  conteudoMensagem: string;
}
