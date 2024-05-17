import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from "@nestjs/config";

@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>("POSTGRES_HOST"),
        port: +configService.get<string>("POSTGRES_PORT"),
        username: configService.get<string>("POSTGRES_USER"),
        password: configService.get<string>("POSTGRES_PASSWORD"),
        database: configService.get<string>("POSTGRES_DB"),        
        entities: [__dirname + "/entities/**"],
        migrations: [__dirname + "/migrations/*.ts"],
        synchronize: false,
        logging: true
      }),
      inject: [ConfigService]
    })]
})
export class DatabaseModule {}
