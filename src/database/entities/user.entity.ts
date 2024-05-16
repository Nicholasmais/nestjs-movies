import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../../users/dto/user.interface';

@Entity({ name: "users" })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({type: "varchar"})
  nome: string;

  @Column({type: "varchar"})
  sobrenome: string;
 
  @Column({type: "varchar"})
  type: UserType;

  @Column({type: "varchar"})
  status: "ativo" | "inativo";

  @Column({type: "varchar"})
  email: string;

  @Column({type: "varchar"})
  senha: string;  
}