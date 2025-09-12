const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
const authController = new AuthController();

// Rotas públicas (não precisam de autenticação)
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Rotas protegidas (precisam de token JWT)
router.get('/verify', authenticateToken, (req, res) => authController.verifyToken(req, res));
router.get('/profile', authenticateToken, (req, res) => authController.getProfile(req, res));


   

module.exports = router;