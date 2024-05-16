import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { Request } from 'express';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly redisClient:  Redis,
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

  async logOut(request: Request): Promise<void>{
    const token = this.extractTokenFromHeader(request);
    if (token){
      await this.redisClient.set(token, '', 'EX', +this.configService.get<string>("JWT_EXPIRATION"));
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === "Bearer" ? token : undefined    
  }  
}
