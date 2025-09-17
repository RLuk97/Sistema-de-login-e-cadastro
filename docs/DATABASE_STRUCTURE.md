# 🗄️ Estrutura do Banco de Dados - Fogo em Vagas

## 📋 Tabelas Principais

### 👤 **users** (Expandir tabela atual)
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  
  -- Novos campos profissionais
  professional_title VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  phone VARCHAR(20),
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  portfolio_url VARCHAR(255),
  profile_image VARCHAR(255),
  
  -- Configurações
  user_type ENUM('candidate', 'company', 'admin') DEFAULT 'candidate',
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 🏢 **companies**
```sql
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  company_name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  description TEXT,
  website VARCHAR(255),
  logo_url VARCHAR(255),
  industry VARCHAR(100),
  company_size ENUM('startup', 'small', 'medium', 'large', 'enterprise'),
  location VARCHAR(255),
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 💼 **jobs**
```sql
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  
  -- Detalhes da vaga
  job_type ENUM('full_time', 'part_time', 'contract', 'internship', 'freelance'),
  work_mode ENUM('remote', 'hybrid', 'onsite'),
  experience_level ENUM('entry', 'junior', 'mid', 'senior', 'lead'),
  
  -- Localização e salário
  location VARCHAR(255),
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  salary_currency VARCHAR(3) DEFAULT 'BRL',
  
  -- Status e configurações
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  expires_at DATETIME,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 📝 **job_applications**
```sql
CREATE TABLE job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER REFERENCES jobs(id),
  user_id INTEGER REFERENCES users(id),
  
  cover_letter TEXT,
  resume_url VARCHAR(255),
  status ENUM('pending', 'reviewing', 'interview', 'rejected', 'accepted') DEFAULT 'pending',
  
  -- Timestamps
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(job_id, user_id)
);
```

### 🏷️ **skills**
```sql
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 🔗 **user_skills**
```sql
CREATE TABLE user_skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  skill_id INTEGER REFERENCES skills(id),
  proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert'),
  
  UNIQUE(user_id, skill_id)
);
```

### 🔗 **job_skills**
```sql
CREATE TABLE job_skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER REFERENCES jobs(id),
  skill_id INTEGER REFERENCES skills(id),
  is_required BOOLEAN DEFAULT false,
  
  UNIQUE(job_id, skill_id)
);
```

### 💬 **messages**
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  job_id INTEGER REFERENCES jobs(id), -- Opcional, para contexto
  
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 🔔 **notifications**
```sql
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  type ENUM('new_job', 'application_update', 'message', 'system'),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  related_id INTEGER, -- ID relacionado (job_id, application_id, etc)
  
  is_read BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📊 Índices Recomendados
```sql
-- Performance para buscas
CREATE INDEX idx_jobs_active ON jobs(is_active);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_type ON jobs(job_type);
CREATE INDEX idx_jobs_created ON jobs(created_at);

-- Performance para aplicações
CREATE INDEX idx_applications_user ON job_applications(user_id);
CREATE INDEX idx_applications_job ON job_applications(job_id);
CREATE INDEX idx_applications_status ON job_applications(status);

-- Performance para mensagens
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
```

## 🔄 Migração da Base Atual
1. Manter tabela `users` atual
2. Adicionar novos campos gradualmente
3. Criar novas tabelas
4. Implementar seeds com dados de exemplo

---
**Próximo Passo:** Implementar migrations incrementais