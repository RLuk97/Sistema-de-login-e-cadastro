# Sistema de Login e Cadastro Completo

🚀 **Sistema em Produção - Funcionando 24 Horas!**

## 🌐 URLs de Produção

### Frontend (Vercel)
- **URL Principal**: https://sistema-de-login-e-cadastro-x6wgzzfj1-ryans-projects-10476dc9.vercel.app
- **Todas as URLs do Vercel funcionais** - Sistema com CORS configurado para aceitar todos os subdomínios

### Backend (Railway)
- **API URL**: https://sistema-de-login-e-cadastro-production.up.railway.app
- **Health Check**: https://sistema-de-login-e-cadastro-production.up.railway.app/health

### Repositório
- **GitHub**: https://github.com/RLuk97/Sistema-de-login-e-cadastro

## ⚡ Status do Sistema
- ✅ **Frontend**: Deployado no Vercel
- ✅ **Backend**: Deployado no Railway
- ✅ **CORS**: Configurado para todas as URLs do Vercel
- ✅ **Banco de Dados**: SQLite funcionando
- ✅ **Conectividade**: Sistema totalmente funcional

## 🏗️ Estrutura do Projeto

```
TelaLoginCadastroFrontBackServerLocal/
├── backend/          # API Node.js + Express (Railway)
├── frontend/         # React App (Vercel)
├── database/         # SQLite Database
└── README.md         # Documentação
```

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + Express
- SQLite3
- bcrypt (hash de senhas)
- jsonwebtoken (JWT)
- cors (configurado para Vercel)

### Frontend
- React
- Axios (requisições HTTP)
- React Router
- CSS Modules

### Banco de Dados
- SQLite

### Deploy
- **Frontend**: Vercel (Deploy automático)
- **Backend**: Railway (Deploy automático via GitHub)

## 🎯 Design Patterns Implementados
- Repository Pattern
- Service Layer
- MVC (Model-View-Controller)
- Clean Code principles

## 🚀 Como Executar Localmente

1. **Backend**: `cd backend && npm install && npm start`
2. **Frontend**: `cd frontend && npm install && npm start`

O backend rodará na porta 3001 e o frontend na porta 3000.

## 🔧 Configurações de Produção

### CORS Configurado
O sistema está configurado para aceitar requisições de:
- Todas as URLs do Vercel (*.vercel.app)
- Localhost (desenvolvimento)
- URLs específicas configuradas

### Deploy Automático
- **Push para GitHub** → **Deploy automático no Railway** (Backend)
- **Push para GitHub** → **Deploy automático no Vercel** (Frontend)

## 📝 Funcionalidades
- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ Validação de dados
- ✅ Hash de senhas com bcrypt
- ✅ Proteção de rotas
- ✅ Interface responsiva
- ✅ Sistema em produção 24/7

---

**⚠️ Importante**: O sistema está hospedado em planos gratuitos e funciona por **24 horas contínuas**. Após períodos de inatividade, pode haver um pequeno delay na primeira requisição devido ao "cold start" dos serviços gratuitos.