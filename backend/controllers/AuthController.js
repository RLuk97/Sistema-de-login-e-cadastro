const AuthService = require('../services/AuthService');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  // Registra um novo usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      const result = await this.authService.register({ name, email, password });
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Realiza o login do usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const result = await this.authService.login({ email, password });
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Verifica se o token é válido e retorna dados do usuário
  async verifyToken(req, res) {
    try {
      // O middleware já validou o token e adicionou o usuário à requisição
      res.status(200).json({
        success: true,
        message: 'Token válido',
        user: req.user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Rota protegida de exemplo - perfil do usuário
  async getProfile(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Perfil do usuário',
        user: req.user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = AuthController;