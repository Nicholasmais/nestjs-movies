import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserType } from './dto/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} 
  
  @Get()
  async retrieveUsers(@Query("type") type?: UserType): Promise<User[]> {
    return this.usersService.retrieveUsers(type);
  }

  @Get(":id")
  async retrieveUserByID(@Param("id") id: string): Promise<User>{
    return this.usersService.retrieveUserByID(id);
  }

  @Post()
  async createUser(@Body(ValidationPipe) user: CreateUserDto): Promise<void>{
    return this.usersService.createUser(user);
  }

  @Patch(":id")
  async patchUserByID(
    @Param("id") id: string,
    @Body(ValidationPipe) patchedUser: Partial<PatchUserDto>,
    @Req() request: Request
  ): Promise<void>{
    return this.usersService.patchUserByID(id, patchedUser, request);
  }

  @Delete(":id")
  async deleteUserByID(
    @Param("id") id: string,
    @Req() req: Request
  ): Promise<void>{
    return this.usersService.deleteUserByID(id, req);
  }
}
