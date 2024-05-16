import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis'; 

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string | undefined;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisClient:  Redis,
  ){
    this.jwtSecret = this.configService.get<string>("JWT_SECRET");
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if (request.route.path === '/users' && request.method === 'POST') {
      return true; 
    }

    const token = this.extractTokenFromHeader(request);
    
    if (!token || await this.isTokenBlackListed(token)){
      throw new UnauthorizedException;
    }

    try{
      const payload = await this.jwtService.verifyAsync(
        token, 
        {
          secret: this.jwtSecret
        }
      )
      request["user"] = payload;
    }
    catch{
      throw new UnauthorizedException;
    }
    return true; 
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === "Bearer" ? token : undefined    
  }

  async isTokenBlackListed(token: string): Promise<boolean> {
    const result = await this.redisClient.exists(token);
    return !!result;
  }
}
