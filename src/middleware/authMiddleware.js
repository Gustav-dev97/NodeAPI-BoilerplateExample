const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secreta'; // Certifique-se de usar a mesma chave secreta

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Não autorizado, token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

module.exports = authMiddleware;