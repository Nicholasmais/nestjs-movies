import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

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
}
