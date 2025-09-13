# Backend - Sistema de Login e Cadastro

Backend da aplicação de login e cadastro com suporte a SQLite (desenvolvimento) e PostgreSQL (produção).

## 🚀 Deploy no Railway

### Pré-requisitos
1. Conta no [Railway](https://railway.app/)
2. Repositório Git com o código

### Passos para Deploy

1. **Conectar ao Railway**
   - Acesse [railway.app](https://railway.app/)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório do seu projeto

2. **Configurar Variáveis de Ambiente**
   No painel do Railway, vá em "Variables" e adicione:
   ```
   NODE_ENV=production
   JWT_SECRET=sua_chave_jwt_super_secreta_aqui
   DB_TYPE=postgresql
   FRONTEND_URL=https://seu-frontend.vercel.app
   ```

3. **Adicionar PostgreSQL**
   - No painel do Railway, clique em "+ New"
   - Selecione "Database" > "PostgreSQL"
   - O Railway criará automaticamente a variável `DATABASE_URL`

4. **Deploy Automático**
   - O Railway detectará automaticamente o `package.json`
   - O deploy será feito automaticamente
   - A URL do backend estará disponível no painel

### Estrutura do Projeto

```
backend/
├── controllers/          # Controladores da aplicação
├── middleware/          # Middlewares (autenticação, etc.)
├── models/             # Modelos de dados (Database.js)
├── routes/             # Rotas da API
├── services/           # Serviços (AuthService)
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore         # Arquivos ignorados pelo Git
├── package.json       # Dependências e scripts
├── railway.json       # Configuração do Railway
└── server.js          # Arquivo principal
```

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|----------|
| `NODE_ENV` | Ambiente de execução | `production` |
| `PORT` | Porta do servidor | `3001` (automático no Railway) |
| `JWT_SECRET` | Chave secreta para JWT | `sua_chave_super_secreta` |
| `DB_TYPE` | Tipo de banco de dados | `postgresql` ou `sqlite` |
| `DATABASE_URL` | URL do PostgreSQL | Criada automaticamente pelo Railway |
| `FRONTEND_URL` | URL do frontend para CORS | `https://seu-app.vercel.app` |

### Endpoints da API

#### Autenticação
- `POST /api/auth/register` - Cadastrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/verify` - Verificar token (protegida)
- `GET /api/auth/profile` - Obter perfil do usuário (protegida)

### Desenvolvimento Local

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

3. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

### Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite** - Banco de dados para desenvolvimento
- **PostgreSQL** - Banco de dados para produção
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **CORS** - Controle de acesso

### Suporte a Múltiplos Bancos

O sistema suporta automaticamente:
- **SQLite** para desenvolvimento local
- **PostgreSQL** para produção no Railway

A troca é feita automaticamente baseada na variável `DB_TYPE`.