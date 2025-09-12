# Sistema de Login e Cadastro Completo

## Estrutura do Projeto

```
TelaLoginCadastroFrontBackServerLocal/
├── backend/          # API Node.js + Express
├── frontend/         # React App
├── database/         # SQLite Database
└── README.md         # Documentação
```

## Tecnologias Utilizadas

### Backend
- Node.js + Express
- SQLite3
- bcrypt (hash de senhas)
- jsonwebtoken (JWT)
- cors

### Frontend
- React
- Axios (requisições HTTP)
- React Router
- CSS Modules

### Banco de Dados
- SQLite

## Design Patterns Implementados
- Repository Pattern
- Service Layer
- MVC (Model-View-Controller)
- Clean Code principles

## Como Executar

1. **Backend**: `cd backend && npm install && npm start`
2. **Frontend**: `cd frontend && npm install && npm start`

O backend rodará na porta 3001 e o frontend na porta 3000.