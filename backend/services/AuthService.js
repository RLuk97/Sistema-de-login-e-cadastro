const jwt = require('jsonwebtoken');

class AuthService {
  constructor(database) {
    this.database = database;
    this.jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
  }

  // Registra um novo usuário
  async register(userData) {
    try {
      const { name, email, password } = userData;

      // Validações básicas
      if (!name || !email || !password) {
        throw new Error('Nome, email e senha são obrigatórios');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      // Verifica se o email já existe
      const existingUser = await this.database.findUserByEmail(email);
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      // Cria o usuário
      const newUser = await this.database.createUser({ name, email, password });
      
      // Gera o token JWT
      const token = this.generateToken(newUser.id);

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        },
        token
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Realiza o login do usuário
  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Validações básicas
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // Busca o usuário pelo email
      const user = await this.database.findUserByEmail(email);
      if (!user) {
        throw new Error('Credenciais inválidas');
      }

      // Verifica a senha
      const isPasswordValid = await this.database.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
      }

      // Gera o token JWT
      const token = this.generateToken(user.id);

      return {
        success: true,
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Verifica se o token JWT é válido
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      const user = await this.database.findUserById(decoded.userId);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Token inválido'
      };
    }
  }

  // Gera um token JWT
  generateToken(userId) {
    return jwt.sign(
      { userId },
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }
}

module.exports = AuthService;