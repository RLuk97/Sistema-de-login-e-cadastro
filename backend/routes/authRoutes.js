const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware para injetar o database
router.use((req, res, next) => {
  req.database = req.app.locals.database;
  next();
});

// Criar uma instância do controller para cada requisição
const createAuthController = (req) => new AuthController(req.database);

// Rotas públicas (não precisam de autenticação)
router.post('/register', (req, res) => {
  const authController = createAuthController(req);
  authController.register(req, res);
});

router.post('/login', (req, res) => {
  const authController = createAuthController(req);
  authController.login(req, res);
});

// Rotas protegidas (precisam de token JWT)
router.get('/verify', authenticateToken, (req, res) => {
  const authController = createAuthController(req);
  authController.verifyToken(req, res);
});

router.get('/profile', authenticateToken, (req, res) => {
  const authController = createAuthController(req);
  authController.getProfile(req, res);
});


   

module.exports = router;