import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserType } from './dto/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // Importe o gerador de UUID
import * as fs from 'fs';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.loadUsersFromFile();
  }

  private loadUsersFromFile(): void {
    try {
      const rawData = fs.readFileSync('users.json');
      this.users = JSON.parse(rawData.toString());
    } catch (error) {
      this.users = [];
    }
  }

  retrieveUsers(type?: UserType): User[] {
    return this.users;
  }

  retrieveUserByID(id: string): User {
    return {
      id: id,
      nome: "Nicholas",
      sobrenome: "Eras Fonseca",
      type: UserType.user,
      status: "ativo",
      email: "nicholas@email.com",
      senha: ''
    }
  }

  retrieveUserByEmail(email: string): User {
    const index = this.users.findIndex(user => user.email === email);
    if (index === -1) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return this.users[index];
  }

  createUser(user: CreateUserDto): void{
    const hashedPassword = bcrypt.hashSync(user.senha, 10);

    this.users.push({
      id: uuidv4(),
      email: user.email,
      nome: user.nome,
      senha: hashedPassword,
      sobrenome: user.sobrenome,
      status: user.status,
      type: user.type
    });

    fs.writeFileSync('users.json', JSON.stringify(this.users, null, 2));
  }
  
  patchUserByID(id: string, user: PatchUserDto): void{
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
