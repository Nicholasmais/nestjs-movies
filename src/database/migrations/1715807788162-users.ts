import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1715807788162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.query(`
      create table users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(50) NOT NULL,
        sobrenome VARCHAR(50) NOT NULL,
        type VARCHAR(10) NOT NULL,
        status VARCHAR(7) CHECK (status IN ('ativo', 'inativo')),
        email VARCHAR(50) NOT NULL UNIQUE,
        senha VARCHAR NOT NULL
      );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        drop table if exists users
      `)
    }

}
