const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

class User {
  constructor() {
    this.dbPath = path.join(__dirname, '../../database/users_new.db');
    this.connectionPool = null;
    this.maxRetries = 3;
    this.retryDelay = 100; // ms
  }

  // Pool de conexão simples
  getConnection() {
    if (!this.connectionPool) {
      this.connectionPool = this.getDatabase();
    }
    return this.connectionPool;
  }

  // Método com retry para operações críticas
  async executeWithRetry(operation, retries = this.maxRetries) {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0 && (error.code === 'SQLITE_BUSY' || error.code === 'SQLITE_LOCKED')) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.executeWithRetry(operation, retries - 1);
      }
      throw error;
    }
  }

  // Método para obter conexão com o banco
  getDatabase() {
    const db = new sqlite3.Database(this.dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.error('Erro ao conectar com o banco:', err.message);
      }
    });
    
    // Configurar WAL mode para melhor concorrência
    db.run('PRAGMA journal_mode = WAL;');
    db.run('PRAGMA synchronous = NORMAL;');
    db.run('PRAGMA cache_size = 1000;');
    db.run('PRAGMA temp_store = MEMORY;');
    
    return db;
  }

  // Inicializa o banco de dados e cria a tabela se não existir
  initDatabase() {
    return new Promise((resolve, reject) => {
      const db = this.getDatabase();

      db.serialize(() => {
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `;

        db.run(createTableQuery, (err) => {
          db.close();
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  // Cria um novo usuário
  async create(userData) {
    const { name, email, password } = userData;
    
    // Hash da senha
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.executeWithRetry(() => {
      return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(this.dbPath);
        
        // Configurar timeout
        db.run('PRAGMA busy_timeout = 30000;');
        
        const query = `
          INSERT INTO users (name, email, password)
          VALUES (?, ?, ?)
        `;

        db.run(query, [name, email, hashedPassword], function(err) {
          db.close((closeErr) => {
            if (closeErr) console.error('Erro ao fechar conexão:', closeErr);
          });
          
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              name,
              email
            });
          }
        });
      });
    });
  }

  // Busca usuário por email
  findByEmail(email) {
    return this.executeWithRetry(() => {
      return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(this.dbPath);
        
        // Configurar timeout
        db.run('PRAGMA busy_timeout = 30000;');
        
        const query = 'SELECT * FROM users WHERE email = ?';
        
        db.get(query, [email], (err, row) => {
          db.close((closeErr) => {
            if (closeErr) console.error('Erro ao fechar conexão:', closeErr);
          });
          
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    });
  }

  // Busca usuário por ID
  findById(id) {
    return new Promise((resolve, reject) => {
      const db = this.getDatabase();
      
      db.serialize(() => {
        const query = 'SELECT * FROM users WHERE id = ?';
        
        db.get(query, [id], (err, row) => {
          db.close();
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    });
  }

  // Verifica se a senha está correta
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;