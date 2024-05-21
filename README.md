# API

A API é uma plataforma para gerenciamento de usuários e filmes. Ela oferece endpoints para autenticação, criação de usuários, gerenciamento de sessões e manipulação de informações sobre filmes.
URL base: https://nestjs-movies-production.up.railway.app/
## Autenticação

Para autenticação, a API utiliza tokens de acesso JWT (JSON Web Token). O token deve ser incluído no cabeçalho de autorização de todas as requisições autenticadas, no formato `Bearer <token>`.

### Registro de Usuário

Endpoint: `POST /users`

Para registrar um novo usuário, envie um JSON no corpo da requisição com os seguintes campos:

```json
{
  "nome": "John",
  "sobrenome": "Doe",
  "type": "admin",
  "status": "ativo",
  "email": "nicholas2@example.com",
  "senha": "123"
}
```

### Login

Endpoint: `POST /auth/login`

Envie suas credenciais (email e senha) no corpo da requisição para obter um token de acesso.

### Logout

Endpoint: `POST /auth/logout`

Esta rota invalida o token atual, enviando-o para uma lista negra no Redis.

## Filmes

A rota de filmes permite a manipulação de informações sobre filmes disponíveis.

### Adicionar Filme

Endpoint: `POST /movies`

Para adicionar um novo filme, envie um JSON no corpo da requisição com os seguintes campos:

```json
{
  "nome": "Parasita",
  "descricao": "Um filme sul-coreano dirigido por Bong Joon-ho, que aborda questões de desigualdade social por meio da história de uma família pobre que se infiltra em uma família rica.",
  "genero": "Suspense / Drama",
  "duracao": 132
}
```
