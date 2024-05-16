import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateMovieDto{  
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsNumber()
  @IsNotEmpty()
  duracao: number;

  created_by: string;

}