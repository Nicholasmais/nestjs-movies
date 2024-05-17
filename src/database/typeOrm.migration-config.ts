import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { UsersEntity } from "./entities/user.entity";
import { MoviesEntity } from "./entities/movie.entity";

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>("POSTGRES_HOST"),
  port: +configService.get<string>("POSTGRES_PORT"),
  username: configService.get<string>("POSTGRES_USER"),
  password: configService.get<string>("POSTGRES_PASSWORD"),
  database: configService.get<string>("POSTGRES_DB"),        
  migrations: [__dirname + "/migrations/*.ts"],
  entities: [UsersEntity, MoviesEntity],
  logging: true,
  synchronize: false,
}

export default new DataSource(dataSourceOptions);