import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../dto/user.interface';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;
 
  @Column()
  type: UserType;

  @Column()
  status: "ativo" | "inativo";

  @Column()
  email: string;

  @Column()
  senha: string;  
}