const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  getMySQLUsers, getPostgresUsers, getMongoUsers,
  createMySQLUser, createPostgresUser, createMongoUser,
  updateMySQLUser, updatePostgresUser, updateMongoUser,
  deleteMySQLUser, deletePostgresUser, deleteMongoUser
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Importar o middleware de autenticação

const router = express.Router();

// Middleware de validação
const validateUser = [
  check('nome').notEmpty().withMessage('O nome é obrigatório'),
  check('departamento').notEmpty().withMessage('O departamento é obrigatório')
];

// MySQL Routes
router.get('/mysql', authMiddleware, getMySQLUsers); // Proteger com autenticação
router.post('/mysql', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createMySQLUser);
router.put('/mysql/:id', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, updateMySQLUser);
router.delete('/mysql/:id', authMiddleware, deleteMySQLUser);

// PostgreSQL Routes
router.get('/postgres', authMiddleware, getPostgresUsers); // Proteger com autenticação
router.post('/postgres', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createPostgresUser);
router.put('/postgres/:id', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, updatePostgresUser);
router.delete('/postgres/:id', authMiddleware, deletePostgresUser);

// MongoDB Routes
router.get('/mongo', authMiddleware, getMongoUsers); // Proteger com autenticação
router.post('/mongo', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createMongoUser);
router.put('/mongo/:id', authMiddleware, validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, updateMongoUser);
router.delete('/mongo/:id', authMiddleware, deleteMongoUser);

module.exports = router;
