import { UserType } from "./user.interface";

export class CreateUserDto{
  nome: string;
  sobrenome: string;
  type: UserType;
}