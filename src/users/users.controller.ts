import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserType } from './dto/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <token>',
  example: 'Bearer'
})@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} 
  
  @Get()
  @ApiOperation({ summary: 'Recuperar todos os usuários' })
  @ApiQuery({ name: 'type', required: false, description: 'Filtrar por tipo de usuário', enum: UserType })
  @ApiResponse({ status: 200, description: 'Usuários recuperados com sucesso.' })
  async retrieveUsers(@Query("type") type?: UserType): Promise<User[]> {
    return this.usersService.retrieveUsers(type);
  }

  @Get(":id")
  @ApiOperation({ summary: 'Recuperar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário recuperado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async retrieveUserByID(@Param("id") id: string): Promise<User>{
    return this.usersService.retrieveUserByID(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async createUser(@Body(ValidationPipe) user: CreateUserDto): Promise<void>{
    return this.usersService.createUser(user);
  }

  @Patch(":id")
  @ApiOperation({ summary: 'Atualizar parcialmente um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async patchUserByID(
    @Param("id") id: string,
    @Body(ValidationPipe) patchedUser: Partial<PatchUserDto>,
    @Req() request: Request
  ): Promise<void>{
    return this.usersService.patchUserByID(id, patchedUser, request);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Deletar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async deleteUserByID(
    @Param("id") id: string,
    @Req() req: Request
  ): Promise<void>{
    return this.usersService.deleteUserByID(id, req);
  }
}
