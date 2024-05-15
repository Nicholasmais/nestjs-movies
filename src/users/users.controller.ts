import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserType } from './dto/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(){
    this.usersService = new UsersService();
  }
  
  @Get()
  retrieveUsers(@Query("type") type?: UserType): User[] {
    return this.usersService.retrieveUsers(type);
  }

  @Get(":id")
  retrieveUserByID(@Param("id") id: string): User{
    return this.usersService.retrieveUserByID(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) user: CreateUserDto): void{
    return this.usersService.createUser(user);
  }

  @Patch(":id")
  patchUserByID(@Param("id") id: string, @Body(ValidationPipe) patchedUser: PatchUserDto): void{
    return this.usersService.patchUserByID(id, patchedUser);
  }

  @Delete(":id")
  deleteUserByID(@Param("id") id: string): void{
    return this.usersService.deleteUserByID(id);
  }
}
