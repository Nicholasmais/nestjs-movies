import { Injectable } from '@nestjs/common';
import { Redis as IORedis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redis: IORedis) {}

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
