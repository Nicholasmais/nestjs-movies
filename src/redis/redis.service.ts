import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.provider';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT')    private readonly redis: RedisClient) {}

  async getValue(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async setValue(key: string, value: string, exp: number): Promise<void> {
    await this.redis.set(key, value, "EX", exp);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return !!result;
  }
}
