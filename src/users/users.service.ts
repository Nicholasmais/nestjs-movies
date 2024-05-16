import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserType } from './dto/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(    
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  async retrieveUsers(type?: UserType): Promise<User[]> {
    return await this.usersRepository.find({
      select: [
        'id',
        'nome',
        'sobrenome',
        'type',
        'status',
        'email'
      ] 
    });
  }

  async retrieveUserByID(id: string): Promise<User> | null {
    const user = await this.usersRepository.findOne({
      where: {id: id}
    });
    if (!user){
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async retrieveUserByEmail(email: string): Promise<User> | null {
    const user = await this.usersRepository.findOne({
      where: {email: email}
    })
    
    if (!user){
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async createUser(userDto: CreateUserDto): Promise<void> {
    if ( await this.usersRepository.findOne({
      where: {email: userDto.email}
    })){
      throw new ConflictException("Email already exists");
    }

    const user = this.mapDtoToEntity(userDto);

    await this.usersRepository.save(user);
  }

  private mapDtoToEntity(userDto: CreateUserDto): User {
    const user = new UsersEntity();
    user.nome = userDto.nome;
    user.sobrenome = userDto.sobrenome;
    user.senha = bcrypt.hashSync(userDto.senha, 10);
    user.type = userDto.type;
    user.status = userDto.status;
    user.email = userDto.email;

    return user;
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
