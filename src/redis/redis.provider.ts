import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import Redis from 'ioredis';

config();
const configService = new ConfigService();

export type RedisClient = Redis;

export const redisProvider: Provider = {
  useFactory: (): RedisClient => {
    return new Redis(configService.get<string>("REDIS_URI"));
  },
  provide: 'REDIS_CLIENT',
};