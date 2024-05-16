import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1715870609212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.query(`
        CREATE TABLE movies (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          nome VARCHAR,
          descricao VARCHAR,
          genero VARCHAR,
          duracao NUMERIC,
          created_by UUID REFERENCES users(id)
      );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        drop table if exists movies
      `)
    }

}
