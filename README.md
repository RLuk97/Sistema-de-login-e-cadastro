# 💻 Br Vagas Tech - Plataforma de Vagas para Tecnologia

🚀 **Sistema em Produção - Conectando Talentos Tech 24 Horas!**

> **Plataforma especializada em vagas para desenvolvedores, engenheiros de software, DevOps, QA, UX/UI e demais profissionais de tecnologia.**

## 🌐 URLs de Produção

### Frontend (Vercel)
- **URL Principal**: https://socialbr.vercel.app/login
- **Todas as URLs do Vercel funcionais** - Sistema com CORS configurado para aceitar todos os subdomínios

### Backend (Railway)
- **API URL**: https://sistema-de-login-e-cadastro-production.up.railway.app
- **Health Check**: https://sistema-de-login-e-cadastro-production.up.railway.app/health

### Repositório
- **GitHub**: https://github.com/RLuk97/br-vagas-tech

## ⚡ Status do Sistema
- ✅ **Frontend**: Deployado no Vercel
- ✅ **Backend**: Deployado no Railway
- ✅ **CORS**: Configurado para todas as URLs do Vercel
- ✅ **Banco de Dados**: SQLite funcionando
- ✅ **Conectividade**: Sistema totalmente funcional

## 🏗️ Estrutura do Projeto

```
br-vagas-tech/
├── backend/          # API Node.js + Express (Railway)
├── frontend/         # React App (Vercel)
├── database/         # SQLite Database
├── docs/            # Documentação técnica
├── ROADMAP_BR_VAGAS_TECH.md  # Roadmap de desenvolvimento
└── README.md         # Documentação principal
```

## 🛠️ Stack Tecnológica

### Backend
- **Node.js + Express** - API RESTful
- **SQLite3** - Banco de dados local
- **bcrypt** - Hash seguro de senhas
- **jsonwebtoken (JWT)** - Autenticação
- **cors** - Configurado para Vercel

### Frontend
- **React** - Interface moderna
- **Axios** - Requisições HTTP
- **React Router** - Navegação SPA
- **CSS Modules** - Estilização componentizada

### Banco de Dados
- **Desenvolvimento**: SQLite (local)
- **Produção**: PostgreSQL (Railway)

### Deploy & DevOps
- **Frontend**: Vercel (Deploy automático)
- **Backend**: Railway (Deploy automático via GitHub)
- **CI/CD**: Integração contínua via GitHub

## 🎯 Arquitetura & Patterns
- **Repository Pattern** - Abstração de dados
- **Service Layer** - Lógica de negócio
- **MVC (Model-View-Controller)** - Separação de responsabilidades
- **Clean Code** - Código limpo e manutenível
- **RESTful API** - Padrões de API

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação
```bash
# Backend
cd backend && npm install && npm start

# Frontend  
cd frontend && npm install && npm start
```

O backend rodará na **porta 3001** e o frontend na **porta 3000**.

## 🔧 Configurações de Produção

### CORS Configurado
O sistema está configurado para aceitar requisições de:
- ✅ Todas as URLs do Vercel (*.vercel.app)
- ✅ Localhost (desenvolvimento)
- ✅ URLs específicas configuradas

### Deploy Automático
- **Push para GitHub** → **Deploy automático no Railway** (Backend)
- **Push para GitHub** → **Deploy automático no Vercel** (Frontend)

## 💼 Funcionalidades Tech

### 🔐 Autenticação & Segurança
- ✅ Cadastro de desenvolvedores
- ✅ Login com autenticação JWT
- ✅ Validação robusta de dados
- ✅ Hash de senhas com bcrypt
- ✅ Proteção de rotas sensíveis

### 🎨 Interface & UX
- ✅ Interface responsiva e moderna
- ✅ Design focado em UX para devs
- ✅ Navegação intuitiva
- ✅ Sistema em produção 24/7

### 🚀 Próximas Funcionalidades Tech
- 🔄 Sistema de vagas para desenvolvedores
- 🔄 Filtros por stack tecnológica
- 🔄 Match entre devs e empresas tech
- 🔄 Dashboard para recrutadores tech
- 🔄 API para integração com job boards

## 📋 Roadmap

Consulte o [**ROADMAP_BR_VAGAS_TECH.md**](./ROADMAP_BR_VAGAS_TECH.md) para ver o plano completo de desenvolvimento da plataforma.

## 🤝 Contribuição

Interessado em contribuir? Este é um projeto open-source focado no ecossistema tech brasileiro!

---

**⚠️ Importante**: O sistema está hospedado em planos gratuitos e funciona por **24 horas contínuas**. Após períodos de inatividade, pode haver um pequeno delay na primeira requisição devido ao "cold start" dos serviços gratuitos.

**🎯 Missão**: Conectar os melhores talentos tech do Brasil com as melhores oportunidades do mercado! 🇧🇷💻