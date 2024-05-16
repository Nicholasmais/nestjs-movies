import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ){}

  async signIn(email: string, password: string): Promise<AuthResponseDto>{
    const user = await this.userService.retrieveUserByEmail(email);

    if (!bcrypt.compareSync(password, user.senha)){
      throw new UnauthorizedException("Senha inválida");
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token: token,
      expiresIn: +this.configService.get<string>("JWT_EXPIRATION")
    }
  }
}
