import { UserType } from "./user.interface";
import { IsEmail, IsEnum, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O primeiro nome do usuário',
    example: 'João',
    required: true
  })
  nome: string;

  @IsString()
  @ApiProperty({
    description: 'O sobrenome do usuário',
    example: 'Silva',
    required: false
  })
  sobrenome: string;

  @IsString()
  @ApiProperty({
    description: 'A senha para a conta do usuário',
    example: 'senha123',
    required: true
  })
  senha: string;

  @IsEnum(UserType, {
    message: "Campo obrigatório: type"
  })
  @ApiProperty({
    description: 'O tipo de usuário',
    example: UserType.admin, // Ajuste o exemplo conforme seu enum UserType
    required: true
  })
  type: UserType;

  @IsEnum(["ativo", "inativo"], {
    message: "Campo obrigatório: status"
  })
  @ApiProperty({
    description: 'O status da conta do usuário',
    example: 'ativo',
    required: true
  })
  status: "ativo" | "inativo";

  @IsEmail()
  @ApiProperty({
    description: 'O endereço de e-mail do usuário',
    example: 'joao.silva@exemplo.com',
    required: true
  })
  email: string;
}
