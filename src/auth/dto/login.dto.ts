import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'usuario@example.com',
    required: true
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A senha do usuário',
    example: 'senha123',
    required: true
  })
  password: string;
}
