import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}
  
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body('email') username: string,
    @Body('password') password: string
  ): Promise<AuthResponseDto>{
    return this.authService.signIn(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logOut(@Req() request: Request): Promise<void>{
    return this.authService.logOut(request);
  }
}
