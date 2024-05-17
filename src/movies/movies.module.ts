import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from "../database/entities/movie.entity";
import { RedisService } from 'src/redis/redis.service';
import { Redis as IORedis } from 'ioredis';

@Module({
  providers: [MoviesService, RedisService, IORedis],
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([MoviesEntity])],
  exports: [MoviesService],
})
export class MoviesModule {}
