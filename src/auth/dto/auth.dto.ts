import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O token de autenticação JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true
  })
  token: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O tempo de expiração do token em segundos',
    example: 3600,
    required: true
  })
  expiresIn: number;
}
