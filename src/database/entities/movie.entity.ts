import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity({ name: "movies" })
export class MoviesEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({type: "varchar"})
  nome: string;

  @Column({type: "varchar"})
  descricao: string;

  @Column({type: "varchar"})
  genero: string;

  @Column({type: "varchar"})
  duracao: number; 

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: "created_by" })
  created_by: string
}