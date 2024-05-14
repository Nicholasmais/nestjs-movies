export interface User {
  id: string,
  nome: string,
  sobrenome: string[],
  type: UserType
}

export enum UserType{
  user = "user",
  admin = "admin"
}