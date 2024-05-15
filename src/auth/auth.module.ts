import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from "@nestjs/config"
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    JwtModule.registerAsync({
      global: true,
      imports:[ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: +ConfigService.get<string>("JWT_EXPIRATION") 
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
