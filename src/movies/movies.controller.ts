import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './dto/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {} 
  
  @Get()
  async retrieveMovies(): Promise<Movie[]> {
    return this.moviesService.retrieveMovies();
  }

  @Get(":id")
  async retrieveMovieByID(@Param("id") id: string): Promise<Movie>{
    return this.moviesService.retrieveMovieByID(id);
  }

  @Post()
  async createMovie(
      @Body(ValidationPipe) Movie: CreateMovieDto,
      @Req() request: Request
    ): Promise<void>{
    return this.moviesService.createMovie(Movie, request);
  }

  @Patch(":id")
  async patchMovieByID(
    @Param("id") id: string,
    @Body(ValidationPipe) patchedMovie: Partial<PatchMovieDto>,
    @Req() request: Request
  ): Promise<void>{
    return this.moviesService.patchMovieByID(id, patchedMovie, request);
  }

  @Delete(":id")
  async deleteMovieByID(
    @Param("id") id: string,
    @Req() req: Request
  ): Promise<void>{
    return this.moviesService.deleteMovieByID(id, req);
  }
}
