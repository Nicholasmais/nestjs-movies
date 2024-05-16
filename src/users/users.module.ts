import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from "../database/entities/user.entity";
import { Redis } from 'ioredis';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, Redis]
})
export class UsersModule {}
