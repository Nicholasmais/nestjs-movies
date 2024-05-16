import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { MoviesEntity } from 'src/database/entities/movie.entity';
import { Repository } from 'typeorm';
import { Movie } from './dto/movie.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';
import { Request } from 'express';

@Injectable()
export class MoviesService {
  constructor(    
    @InjectRepository(MoviesEntity)
    private readonly moviesRepository: Repository<MoviesEntity>
  ) {}

  async retrieveMovies(): Promise<Movie[]> {
    return await this.moviesRepository.createQueryBuilder("movie")
      .leftJoinAndSelect("movie.created_by", "created_by")
      .select([
        "movie.id",
        "movie.nome",
        "movie.descricao",
        "movie.genero",
        "movie.duracao",
        "created_by.nome"
      ])
      .getMany();
  }

  async retrieveMovieByID(id: string): Promise<Movie> | null {
    const Movie = await this.moviesRepository.findOne({
      where: {id: id}
    });
    if (!Movie){
      throw new NotFoundException("Movie not found");
    }

    return Movie;
  }

  async createMovie(movieDto: CreateMovieDto, request: Request): Promise<void> {
    const Movie = this.mapDtoToEntity(movieDto, request);

    await this.moviesRepository.save(Movie);
  }

  private mapDtoToEntity(movieDto: CreateMovieDto, request: Request): Movie {
      const movieEntity = new MoviesEntity();
      movieEntity.nome = movieDto.nome;
      movieEntity.descricao = movieDto.descricao;
      movieEntity.genero = movieDto.genero;
      movieEntity.duracao = movieDto.duracao;
      movieEntity.created_by = request["user"]["sub"];      
      return movieEntity;    
  }

  private mapDtoToPartialEntity(movieDto: PatchMovieDto): Partial<MoviesEntity> {
    const partialMovieEntity: Partial<MoviesEntity> = {};
  
    if (movieDto.nome !== undefined) {
      partialMovieEntity.nome = movieDto.nome;
    }

    if (movieDto.descricao !== undefined) {
      partialMovieEntity.descricao = movieDto.descricao;
    }

    if (movieDto.genero !== undefined) {
      partialMovieEntity.genero = movieDto.genero;
    }

    if (movieDto.duracao !== undefined) {
      partialMovieEntity.duracao = movieDto.duracao;
    }

    return partialMovieEntity;
  }  
  
  async patchMovieByID(id: string, Movie: PatchMovieDto, req: Request): Promise<void>{  
    const movieToUpdate = await this.moviesRepository
      .createQueryBuilder("movie")
      .select("movie.created_by", "created_by")
      .where("movie.id = :id", { id })
      .getRawOne();       
    
    if (!movieToUpdate){
      throw new NotFoundException("Movie not found");
    }

    if (req["user"]["sub"] != movieToUpdate.created_by) {
      throw new UnauthorizedException("One can only update self Movie");
    }

    if (!Object.keys(this.mapDtoToPartialEntity(Movie)).length){
      throw new UnprocessableEntityException("Malformed body");
    }    

    await this.moviesRepository.update(
      id,
      this.mapDtoToPartialEntity(Movie)
    );
  }

  async deleteMovieByID(id: string, req: Request): Promise<void> {
    const movieToDelete = await this.moviesRepository
      .createQueryBuilder("movie")
      .select("movie.created_by", "created_by")
      .where("movie.id = :id", { id })
      .getRawOne();
    
    if (!movieToDelete){
      throw new NotFoundException("Movie not found");
    }
    
    if (req["user"]["sub"] != movieToDelete.created_by) {
      throw new UnauthorizedException("One can only delete self Movie");
    }

    this.moviesRepository.delete({
      id: id
    });
  }
}
