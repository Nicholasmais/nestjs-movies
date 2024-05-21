import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './dto/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('defaultBearerAuth')
@ApiTags('movies')
@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {} 

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os filmes' })
  @ApiHeader({
    name: 'Authorization2',
    description: 'Bearer token', // Descrição personalizada para o token Bearer
  })
  @ApiResponse({ status: 200, description: 'Filmes recuperados com sucesso.' })
  async retrieveMovies(): Promise<Movie[]> {
    return this.moviesService.retrieveMovies();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Recuperar um filme pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do filme' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token', // Descrição personalizada para o token Bearer
  })
  @ApiResponse({ status: 200, description: 'Filme recuperado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  async retrieveMovieByID(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.retrieveMovieByID(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo filme' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token', // Descrição personalizada para o token Bearer
  })
  @ApiResponse({ status: 201, description: 'Filme criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async createMovie(
    @Body(ValidationPipe) movie: CreateMovieDto,
    @Req() request: Request
  ): Promise<void> {
    return this.moviesService.createMovie(movie, request);
  }

  @Patch(":id")
  @ApiOperation({ summary: 'Atualizar parcialmente um filme pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do filme' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token', // Descrição personalizada para o token Bearer
  })
  @ApiResponse({ status: 200, description: 'Filme atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async patchMovieByID(
    @Param("id") id: string,
    @Body(ValidationPipe) patchedMovie: Partial<PatchMovieDto>,
    @Req() request: Request
  ): Promise<void> {
    return this.moviesService.patchMovieByID(id, patchedMovie, request);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Deletar um filme pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do filme' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token', // Descrição personalizada para o token Bearer
  })
  @ApiResponse({ status: 200, description: 'Filme deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  async deleteMovieByID(
    @Param("id") id: string,
    @Req() req: Request
  ): Promise<void> {
    return this.moviesService.deleteMovieByID(id, req);
  }
}
