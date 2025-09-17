# 🔌 API Endpoints - Fogo em Vagas

## 🔐 **Autenticação** (Existente - Expandir)

### POST /api/auth/register
```json
{
  "email": "user@email.com",
  "password": "senha123",
  "full_name": "João Silva",
  "user_type": "candidate", // candidate | company
  "professional_title": "Desenvolvedor Full Stack", // novo
  "location": "São Paulo, SP" // novo
}
```

### POST /api/auth/login
```json
{
  "email": "user@email.com",
  "password": "senha123"
}
```

## 👤 **Usuários/Perfis**

### GET /api/users/profile
Retorna perfil do usuário logado
```json
{
  "id": 1,
  "email": "joao@email.com",
  "full_name": "João Silva",
  "professional_title": "Desenvolvedor Full Stack",
  "bio": "Desenvolvedor com 5 anos de experiência...",
  "location": "São Paulo, SP",
  "linkedin_url": "linkedin.com/in/joaosilva",
  "skills": ["React", "Node.js", "Python"],
  "user_type": "candidate"
}
```

### PUT /api/users/profile
Atualiza perfil do usuário
```json
{
  "professional_title": "Senior Full Stack Developer",
  "bio": "Texto atualizado...",
  "location": "Rio de Janeiro, RJ",
  "linkedin_url": "linkedin.com/in/joaosilva",
  "github_url": "github.com/joaosilva"
}
```

### POST /api/users/skills
Adiciona habilidade ao perfil
```json
{
  "skill_name": "React",
  "proficiency_level": "advanced"
}
```

## 💼 **Vagas**

### GET /api/jobs
Lista vagas com filtros
```
Query params:
- page=1
- limit=10
- location=São Paulo
- job_type=full_time
- work_mode=remote
- experience_level=senior
- skills=React,Node.js
- salary_min=5000
- salary_max=15000
```

Resposta:
```json
{
  "jobs": [
    {
      "id": 1,
      "title": "Desenvolvedor React Sênior",
      "company": {
        "id": 1,
        "name": "Empresa XYZ",
        "logo_url": "/logos/empresa-xyz.png"
      },
      "location": "São Paulo, SP",
      "work_mode": "hybrid",
      "job_type": "full_time",
      "salary_min": 10000,
      "salary_max": 15000,
      "skills": ["React", "TypeScript", "Jest"],
      "created_at": "2024-01-15T10:30:00Z",
      "applications_count": 15
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_jobs": 47
  }
}
```

### GET /api/jobs/:id
Detalhes de uma vaga específica
```json
{
  "id": 1,
  "title": "Desenvolvedor React Sênior",
  "description": "Buscamos um desenvolvedor React experiente...",
  "requirements": "5+ anos com React, TypeScript...",
  "benefits": "Vale refeição, plano de saúde...",
  "company": {
    "id": 1,
    "name": "Empresa XYZ",
    "description": "Empresa de tecnologia...",
    "website": "https://empresaxyz.com",
    "logo_url": "/logos/empresa-xyz.png"
  },
  "location": "São Paulo, SP",
  "work_mode": "hybrid",
  "job_type": "full_time",
  "experience_level": "senior",
  "salary_min": 10000,
  "salary_max": 15000,
  "skills": [
    {"name": "React", "is_required": true},
    {"name": "TypeScript", "is_required": true},
    {"name": "Jest", "is_required": false}
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-02-15T23:59:59Z",
  "applications_count": 15,
  "user_applied": false
}
```

### POST /api/jobs (Apenas empresas)
Criar nova vaga
```json
{
  "title": "Desenvolvedor React Sênior",
  "description": "Descrição completa da vaga...",
  "requirements": "Requisitos necessários...",
  "benefits": "Benefícios oferecidos...",
  "job_type": "full_time",
  "work_mode": "hybrid",
  "experience_level": "senior",
  "location": "São Paulo, SP",
  "salary_min": 10000,
  "salary_max": 15000,
  "skills": [
    {"name": "React", "is_required": true},
    {"name": "TypeScript", "is_required": true}
  ],
  "expires_at": "2024-02-15"
}
```

## 📝 **Candidaturas**

### POST /api/jobs/:id/apply
Candidatar-se a uma vaga
```json
{
  "cover_letter": "Carta de apresentação personalizada...",
  "resume_url": "/resumes/joao-silva-cv.pdf"
}
```

### GET /api/applications/my
Minhas candidaturas
```json
{
  "applications": [
    {
      "id": 1,
      "job": {
        "id": 1,
        "title": "Desenvolvedor React",
        "company_name": "Empresa XYZ"
      },
      "status": "pending",
      "applied_at": "2024-01-15T14:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### GET /api/jobs/:id/applications (Apenas empresas)
Candidatos de uma vaga
```json
{
  "applications": [
    {
      "id": 1,
      "candidate": {
        "id": 2,
        "full_name": "João Silva",
        "professional_title": "Desenvolvedor Full Stack",
        "location": "São Paulo, SP",
        "profile_image": "/profiles/joao.jpg"
      },
      "cover_letter": "Carta de apresentação...",
      "status": "pending",
      "applied_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### PUT /api/applications/:id/status (Apenas empresas)
Atualizar status da candidatura
```json
{
  "status": "interview", // pending | reviewing | interview | rejected | accepted
  "notes": "Candidato interessante, agendar entrevista"
}
```

## 🏢 **Empresas**

### POST /api/companies/profile (Apenas empresas)
Criar/atualizar perfil da empresa
```json
{
  "company_name": "Empresa XYZ Ltda",
  "cnpj": "12.345.678/0001-90",
  "description": "Empresa de tecnologia focada em...",
  "website": "https://empresaxyz.com",
  "industry": "Tecnologia",
  "company_size": "medium",
  "location": "São Paulo, SP"
}
```

### GET /api/companies/:id
Perfil público da empresa
```json
{
  "id": 1,
  "company_name": "Empresa XYZ",
  "description": "Empresa de tecnologia...",
  "website": "https://empresaxyz.com",
  "logo_url": "/logos/empresa-xyz.png",
  "industry": "Tecnologia",
  "company_size": "medium",
  "location": "São Paulo, SP",
  "active_jobs_count": 3,
  "created_at": "2024-01-01T00:00:00Z"
}
```

## 💬 **Mensagens**

### GET /api/messages/conversations
Lista conversas do usuário
```json
{
  "conversations": [
    {
      "id": 1,
      "other_user": {
        "id": 2,
        "name": "RH - Empresa XYZ",
        "avatar": "/avatars/empresa-xyz.png"
      },
      "last_message": {
        "content": "Gostaria de agendar uma entrevista...",
        "created_at": "2024-01-15T16:30:00Z",
        "is_read": false
      },
      "job_context": {
        "id": 1,
        "title": "Desenvolvedor React"
      }
    }
  ]
}
```

### GET /api/messages/conversations/:userId
Mensagens de uma conversa
```json
{
  "messages": [
    {
      "id": 1,
      "sender_id": 2,
      "content": "Olá! Vimos seu perfil e gostaríamos...",
      "created_at": "2024-01-15T15:00:00Z"
    },
    {
      "id": 2,
      "sender_id": 1,
      "content": "Oi! Fico muito interessado na vaga...",
      "created_at": "2024-01-15T15:30:00Z"
    }
  ]
}
```

### POST /api/messages
Enviar mensagem
```json
{
  "receiver_id": 2,
  "content": "Mensagem de texto...",
  "job_id": 1 // opcional, para contexto
}
```

## 🔔 **Notificações**

### GET /api/notifications
Lista notificações do usuário
```json
{
  "notifications": [
    {
      "id": 1,
      "type": "application_update",
      "title": "Status da candidatura atualizado",
      "content": "Sua candidatura para Desenvolvedor React foi atualizada para 'Em análise'",
      "is_read": false,
      "created_at": "2024-01-15T17:00:00Z"
    }
  ]
}
```

### PUT /api/notifications/:id/read
Marcar notificação como lida

## 🔍 **Busca e Filtros**

### GET /api/search/jobs
Busca avançada de vagas
```
Query params:
- q=desenvolvedor react (busca textual)
- location=São Paulo
- radius=50 (km)
- salary_min=5000
- company_size=medium,large
- posted_within=7 (dias)
```

### GET /api/skills
Lista todas as habilidades disponíveis
```json
{
  "skills": [
    {"id": 1, "name": "React", "category": "Frontend"},
    {"id": 2, "name": "Node.js", "category": "Backend"},
    {"id": 3, "name": "Python", "category": "Backend"}
  ]
}
```

---
**Próximo Passo:** Implementar endpoints básicos de vagas e candidaturas