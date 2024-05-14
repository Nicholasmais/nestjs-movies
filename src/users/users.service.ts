import { Injectable } from '@nestjs/common';
import { User, UserType } from './dto/user.interface';

@Injectable()
export class UsersService {

  retrieveUsers(type?: UserType): User[] {
    return [
      {
        id: "ae9c17f3-8036-4a5e-9a73-0b61c719e3fa",
        nome: "Nicholas",
        sobrenome: ["Eras", "Fonseca"],
        type: UserType.admin
      },
      {
        id: "a36894fb-d6fb-4d1d-a0b0-73ced3e6f2a3",
        nome: "Fulano",
        sobrenome: ["Ciclano", "Beltrano"],
        type: UserType.user
      }
    ];
  }

  retrieveUserByID(id: string): User {
    return {
      id: id,
      nome: "Nicholas",
      sobrenome: ["Eras", "Fonseca"],
      type: UserType.user
    }
  }

  createUser(user: User): void{
    console.log({
      id: user.id,
      nome: user.nome,
      sobrenome: user.sobrenome,
      tipo: user.type
    });
  }
  
  patchUserByID(id: string, user: User): void{
    console.log({
      id: id,
      nome: user.nome,
      sobrenome: user.sobrenome
    });
  }

  deleteUserByID(id: string): void {
    console.log({
      id: id
    });
  }
}
