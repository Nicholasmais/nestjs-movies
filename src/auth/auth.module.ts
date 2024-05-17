import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"
import { UsersModule } from 'src/users/users.module';
import { RedisService } from 'src/redis/redis.service';
import { redisProvider } from 'src/redis/redis.provider';

@Module({
  imports:[
    JwtModule.registerAsync({
      global: true,
      imports:[],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: +ConfigService.get<string>("JWT_EXPIRATION") 
        }
      }),
      inject: [ConfigService]
    }),
    UsersModule
  ],
  providers: [AuthService, RedisService, redisProvider],
  controllers: [AuthController]
})
export class AuthModule {}
