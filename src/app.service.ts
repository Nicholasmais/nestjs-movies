import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <h1>API</h1>
    <p>A API é uma plataforma para gerenciamento de usuários e filmes. Ela oferece endpoints para autenticação, criação de usuários, gerenciamento de sessões e manipulação de informações sobre filmes.</p>
    <p>
    URL base: https://nestjs-movies-production.up.railway.app/
    </p>
    <a href = "https://elements.getpostman.com/redirect?entityId=22403920-e5a53340-8bb4-4bf6-b2b6-53852dc5f344&entityType=collection" target=”_blank”>
    Teste online
    </a>
    <h2>Autenticação</h2>
    <p>Para autenticação, a API utiliza tokens de acesso JWT (JSON Web Token). O token deve ser incluído no cabeçalho de autorização de todas as requisições autenticadas, no formato <code>Bearer &lt;token&gt;</code>.</p>
    <h3>Registro de Usuário</h3>
    <p>Endpoint: <code>POST /users</code></p>
    <p>Para registrar um novo usuário, envie um JSON no corpo da requisição com os seguintes campos:</p>
    <pre><code>{
      "nome": "John",
      "sobrenome": "Doe",
      "type": "admin",
      "status": "ativo",
      "email": "nicholas2@example.com",
      "senha": "123"
    }</code></pre>
    <h3>Login</h3>
    <p>Endpoint: <code>POST /auth/login</code></p>
    <p>Envie suas credenciais (email e senha) no corpo da requisição para obter um token de acesso.</p>
    <h3>Logout</h3>
    <p>Endpoint: <code>POST /auth/logout</code></p>
    <p>Esta rota invalida o token atual, enviando-o para uma lista negra no Redis.</p>
    <h2>Filmes</h2>
    <p>A rota de filmes permite a manipulação de informações sobre filmes disponíveis.</p>
    <h3>Adicionar Filme</h3>
    <p>Endpoint: <code>POST /movies</code></p>
    <p>Para adicionar um novo filme, envie um JSON no corpo da requisição com os seguintes campos:</p>
    <pre><code>{
      "nome": "Parasita",
      "descricao": "Um filme sul-coreano dirigido por Bong Joon-ho, que aborda questões de desigualdade social por meio da história de uma família pobre que se infiltra em uma família rica.",
      "genero": "Suspense / Drama",
      "duracao": 132
    }</code></pre>
  `;  }
}
