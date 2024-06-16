const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/authModel');

const SECRET_KEY = 'secreta'; // Defina sua chave secreta

// Registrar um novo usuário
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserAuth.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new UserAuth({ email, password: hashedPassword });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Encontrar o usuário pelo email
      let user = await UserAuth.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Credenciais inválidas' });
      }
  
      // Comparar a senha fornecida com a senha armazenada
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciais inválidas' });
      }
  
      // Definir o payload do token JWT
      const payload = { userId: user._id };
  
      // Definir a chave secreta e o tempo de expiração
      const SECRET_KEY = 'secreta';
      const expiresIn = '1h'; // Tempo de expiração em horas
  
      // Criar e assinar o token JWT
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
  
      // Calcular a data de expiração do token
      const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hora em milissegundos
      const expirationDate = new Date(expirationTime);
  
      // Enviar a resposta com o token e a data de expiração
      res.status(200).json({ 
        token, 
        expiresAt: expirationDate.toISOString() // Formato ISO para a data de expiração
      });
    } catch (err) {
      // Enviar erro interno do servidor
      res.status(500).json({ error: err.message });
    }
  };  

module.exports = { registerUser, loginUser };