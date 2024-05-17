import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from "../database/entities/user.entity";
import { RedisService } from 'src/redis/redis.service';
import { redisProvider } from 'src/redis/redis.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, RedisService, redisProvider]
})
export class UsersModule {}
