import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from "../database/entities/movie.entity";

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([MoviesEntity])],
  exports: [MoviesService],
})
export class MoviesModule {}