export interface User {
  id: string,
  nome: string,
  sobrenome: string,
  type: UserType,
  status: "ativo" | "inativo",
  email: string,
  senha: string
}

export enum UserType{
  user = "user",
  admin = "admin"
}