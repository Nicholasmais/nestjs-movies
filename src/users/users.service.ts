import { ConflictException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { User, UserType } from './dto/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

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

  private mapDtoToPartialEntity(userDto: PatchUserDto): Partial<UsersEntity> {
    const user: Partial<UsersEntity> = {};
  
    if (userDto.nome !== undefined) {
      user.nome = userDto.nome;
    }
  
    if (userDto.sobrenome !== undefined) {
      user.sobrenome = userDto.sobrenome;
    }
  
    if (userDto.senha !== undefined) {
      user.senha = bcrypt.hashSync(userDto.senha, 10);
    }
  
    if (userDto.type !== undefined) {
      user.type = userDto.type;
    }
  
    if (userDto.status !== undefined) {
      user.status = userDto.status;
    }
  
    if (userDto.email !== undefined) {
      user.email = userDto.email;
    }
  
    return user;
  }  
  
  async patchUserByID(id: string, user: PatchUserDto, req: Request): Promise<void>{
    if (req["user"]["sub"] != id) {
      throw new UnauthorizedException("One can only update self user");
    }

    const userToUpdate = await this.usersRepository.findOne({
      where: {id: id}
    });
    
    if (!userToUpdate){
      throw new NotFoundException("User not found");
    }

    if (!Object.keys(this.mapDtoToPartialEntity(user)).length){
      throw new UnprocessableEntityException("Malformed body");
    }    

    await this.usersRepository.update(
      id,
      this.mapDtoToPartialEntity(user)
    );
  }

  async deleteUserByID(id: string, req: Request): Promise<void> {
    if (req["user"]["sub"] != id) {
      throw new UnauthorizedException("One can only delete self user");
    }

    const userToUpdate = await this.usersRepository.findOne({
      where: {id: id}
    });
    
    if (!userToUpdate){
      throw new NotFoundException("User not found");
    }

    this.usersRepository.delete({
      id: id
    });
  }
}
