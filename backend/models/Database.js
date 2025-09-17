const bcrypt = require('bcrypt');

class Database {
  constructor() {
    this.dbType = process.env.DB_TYPE || 'sqlite';
    this.connection = null;
  }

  async initDatabase() {
    if (this.dbType === 'postgresql') {
      await this.initPostgreSQL();
    } else {
      await this.initSQLite();
    }
  }

  async initPostgreSQL() {
    const { Pool } = require('pg');
    
    this.connection = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    // Criar tabela se não existir
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await this.connection.query(createTableQuery);
    console.log('✅ Tabela users criada/verificada no PostgreSQL');
  }

  async initSQLite() {
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    
    const dbPath = path.join(__dirname, '../../database/users_new.db');
    
    this.connection = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.error('Erro ao conectar com SQLite:', err.message);
        throw err;
      }
    });

    // Configurar WAL mode
    this.connection.run('PRAGMA journal_mode = WAL;');
    this.connection.run('PRAGMA synchronous = NORMAL;');
    
    // Criar tabela
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Criar tabela de fotos
    await this.createPhotoTables();

    return new Promise((resolve, reject) => {
      this.connection.run(createTableQuery, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Tabela users criada/verificada no SQLite');
          resolve();
        }
      });
    });
  }

  async createUser(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (this.dbType === 'postgresql') {
      const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const result = await this.connection.query(query, [name, email, hashedPassword]);
      return result.rows[0];
    } else {
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      return new Promise((resolve, reject) => {
        this.connection.run(query, [name, email, hashedPassword], function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, name, email });
          }
        });
      });
    }
  }

  async findUserByEmail(email) {
    if (this.dbType === 'postgresql') {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await this.connection.query(query, [email]);
      return result.rows[0] || null;
    } else {
      const query = 'SELECT * FROM users WHERE email = ?';
      return new Promise((resolve, reject) => {
        this.connection.get(query, [email], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row || null);
          }
        });
      });
    }
  }

  async findUserById(id) {
    if (this.dbType === 'postgresql') {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await this.connection.query(query, [id]);
      return result.rows[0] || null;
    } else {
      const query = 'SELECT * FROM users WHERE id = ?';
      return new Promise((resolve, reject) => {
        this.connection.get(query, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row || null);
          }
        });
      });
    }
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async createPhotoTables() {
    if (this.dbType === 'postgresql') {
      await this.createPhotoTablesPostgreSQL();
    } else {
      await this.createPhotoTablesSQLite();
    }
  }

  async createPhotoTablesPostgreSQL() {
    const query = `
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INTEGER NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        album VARCHAR(100) DEFAULT 'Aleatórias',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await this.connection.query(query);
    console.log('✅ Tabela photos criada/verificada no PostgreSQL');
  }

  async createPhotoTablesSQLite() {
    const query = `
      CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        thumbnail_path VARCHAR(500),
        file_size INTEGER NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        album VARCHAR(100) DEFAULT 'Aleatórias',
        is_album_placeholder INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `;
    
    await new Promise((resolve, reject) => {
      this.connection.run(query, (err) => {
        if (err) {
          console.error('Erro ao criar tabela photos:', err);
          reject(err);
        } else {
          console.log('✅ Tabela photos criada/verificada no SQLite');
          // Adicionar coluna is_album_placeholder se não existir
          this.connection.run('ALTER TABLE photos ADD COLUMN is_album_placeholder INTEGER DEFAULT 0', (alterErr) => {
            // Ignorar erro se a coluna já existir
            // Adicionar coluna thumbnail_path se não existir
            this.connection.run('ALTER TABLE photos ADD COLUMN thumbnail_path VARCHAR(500)', (thumbErr) => {
              // Ignorar erro se a coluna já existir
              resolve();
            });
          });
        }
      });
    });
  }
}

module.exports = Database;