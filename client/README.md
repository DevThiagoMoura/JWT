Autenticação JWT — Node.js + React

Este projeto implementa uma autenticação completa utilizando JWT (JSON Web Token), com backend em Node.js/Express e frontend em React (Vite). O sistema inclui login, geração de token, validação via middleware, rota protegida e integração total entre cliente e servidor. A interface está estilizada em tema escuro e centralizada.

Tecnologias utilizadas

Backend:
Node.js
Express
bcryptjs
jsonwebtoken
cors
dotenv
nodemon

Frontend:
React
Vite
Axios
CSS customizado (tema escuro moderno)

Estrutura do projeto

JWT/
server/ → Backend
client/ → Frontend

Pré-requisitos

Node.js instalado
Git instalado
Editor de código (VS Code recomendado)
Navegador moderno (Chrome, Edge, Brave, etc.)

Como rodar o backend (server)

Abra o terminal e entre na pasta server:
cd server

Instale as dependências:
npm install

Crie o arquivo .env:
JWT_SECRET=supersegredo123
JWT_EXPIRES_IN=1h
PORT=3000

O arquivo .env.example está disponível como modelo.

Inicie o backend:
npm run dev

Se tudo estiver correto, aparecerá:
Servidor rodando em http://localhost:3000

Endpoints do backend

POST /login
Recebe email e senha. Exemplo de body:
{
"email": "admin@example.com
",
"senha": "123456"
}

Retorno:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}

GET /private
Requer token JWT no header Authorization:

Authorization: Bearer <token>

Retorno:
{
"mensagem": "Acesso autorizado",
"usuario": {
"id": 1,
"email": "admin@example.com
",
"nome": "Admin"
}
}

Como rodar o frontend (client)

Abra o terminal e entre na pasta client:
cd client

Instale as dependências:
npm install

Inicie o projeto React:
npm run dev

Acesse no navegador:
http://localhost:5173/

Integração front ↔ back

O frontend realiza:
Envio de POST para /login
Armazenamento do token no sessionStorage
Envio de GET para /private com header Authorization: Bearer <token>
Exibição dos dados retornados
Tratamento de erros (401, 403, etc.)
Interface estilizada e centralizada

Credenciais de teste

Email: admin@example.com

Senha: 123456

Essas credenciais são as cadastradas no arquivo usuarios.js.

Funcionamento da autenticação JWT

O usuário envia email e senha
O backend verifica as credenciais
Se corretas, gera um token JWT
O frontend salva o token no sessionStorage
Para acessar rotas protegidas, envia Authorization: Bearer <token>
O middleware valida o token
Se válido → rota liberada
Se inválido → erro (401 ou 403)

Critérios de aceitação atendidos

/login retorna token para credenciais válidas
Rota /private acessível apenas com token válido
Middleware JWT funcionando
Frontend integrado corretamente ao backend
Token armazenado no sessionStorage
Header Authorization enviado corretamente
Projeto rodando com Node + React
Interface estilizada e centralizada
README contendo todas as instruções necessárias