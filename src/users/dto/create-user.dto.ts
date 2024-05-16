import { UserType } from "./user.interface";
import { IsEmail, IsEnum, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto{  
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  sobrenome: string;

  @IsString()
  senha: string;

  @IsEnum(UserType, {
    message: "Campo obrigatório: type"
  })
  type: UserType;

  @IsEnum(["ativo", "inativo"], {
    message: "Campo obrigatório: status"
  })
  status: "ativo" | "inativo" ;

  @IsEmail()
  email: string;
}