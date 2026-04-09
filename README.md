# Tripleten web_project_api_full

Around the U.S. é um projeto full stack desenvolvido no programa de Web Development da TripleTen, com foco na construção de uma aplicação completa com frontend em React e backend em Node.js + Express + MongoDB.

A aplicação permite que usuários se registrem, façam login, editem seus perfis e interajam com cartões, podendo adicionar, remover e curtir conteúdos.

## Principais Recursos Utilizados:

### Frontend

- React + Vite
- React Router
- HTML, CSS (Flexbox, Grid, Responsivo)
- JavaScript (DOM, Classes, Validação)
- Protected Routes
- Armazenamento de token (localStorage)
- Integração com API

### Backend

- Node.js, Express.js
- MongoDB, Mongoose
- API REST
- CRUD de usuários e cards
- Validação com Validator e Celebrate (Joi)
- Tratamento de erros (400, 401, 403, 404, 500)
- Arquitetura modular (controllers, models, routes)

### Autenticação & Segurança

- Registro e login (/signup e /signin)
- Hash de senha (bcrypt)
- Autenticação com JWT
- Middleware de autorização
- Validação de email único

### Regras de Negócio

- Usuários só podem editar seus próprios dados
- Usuários só podem deletar seus próprios cards

### Deploy & Infra

- Servidor em nuvem
- Nginx
- PM2 (restart automático)
- HTTPS (SSL)
- CORS habilitado
- Variáveis de ambiente

## Confira o Projeto:

Acesse: https://webs.vc.chickenkiller.com/
