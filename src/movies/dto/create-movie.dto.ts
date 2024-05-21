import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O nome do filme',
    example: 'Os Vingadores',
    required: true
  })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Uma breve descrição do filme',
    example: 'Um grupo de super-heróis se une para salvar o mundo.',
    required: true
  })
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O gênero do filme',
    example: 'Ação',
    required: true
  })
  genero: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A duração do filme em minutos',
    example: 120,
    required: true
  })
  duracao: number;

  @IsString()
  @ApiProperty({
    description: 'O ID do usuário que criou o filme',
    example: 'user_12345',
    required: true
  })
  created_by: string;
}
