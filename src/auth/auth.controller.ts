import { Body, Controller, HttpCode, HttpStatus, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  @ApiOperation({ summary: 'Entrar na aplicação' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async signIn(
    @Body(ValidationPipe) login: LoginDto,
    @Body('email') username: string,
    @Body('password') password: string
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  @ApiOperation({ summary: 'Sair da aplicação' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso.' })
  async logOut(@Req() request: Request): Promise<void> {
    return this.authService.logOut(request);
  }
}
