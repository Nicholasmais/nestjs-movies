import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from "@nestjs/config";

@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>("DB_HOST"),
        port: +configService.get<string>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),        
        entities: [__dirname + "/entities/**"],
        migrations: [__dirname + "/migrations/*.ts"],
        synchronize: false,
      }),
      inject: [ConfigService]
    })]
})
export class DatabaseModule {}
