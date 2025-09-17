const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar autenticação JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    console.log('Auth Debug - Header:', authHeader);
    console.log('Auth Debug - Token:', token ? 'Token presente' : 'Token ausente');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso requerido'
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    const decoded = jwt.verify(token, jwtSecret);
    console.log('Auth Debug - Decoded:', decoded);
    
    // Busca o usuário no banco de dados
    const userModel = new User();
    const user = await userModel.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Adiciona os dados do usuário à requisição
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

module.exports = {
  authenticateToken
};