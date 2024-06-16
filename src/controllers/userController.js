const { User, getUsersMySQL, getUsersPostgres } = require('../models/userModel');
const { mysqlPool, postgresClient } = require('../config/database'); // Adicione a importação de mysqlPool

// Operações MySQL
const getMySQLUsers = (req, res) => {
  getUsersMySQL((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

const createMySQLUser = (req, res) => {
  const { nome, departamento } = req.body;
  mysqlPool.query(  // Agora mysqlPool está disponível
    'INSERT INTO user (nome, departamento) VALUES (?, ?)',
    [nome, departamento],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuario criado!', userId: results.insertId });
    }
  );
};

const updateMySQLUser = (req, res) => {
  const { id } = req.params;
  const { nome, departamento } = req.body;
  mysqlPool.query(  // Agora mysqlPool está disponível
    'UPDATE user SET nome = ?, departamento = ? WHERE id = ?',
    [nome, departamento, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Usuario Atualizado!' });
    }
  );
};

const deleteMySQLUser = (req, res) => {
  const { id } = req.params;
  mysqlPool.query(  // Agora mysqlPool está disponível
    'DELETE FROM user WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Usuario Deletado!' });
    }
  );
};

// Operações PostgreSQL
const getPostgresUsers = (req, res) => {
  getUsersPostgres((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results.rows);
  });
};

const createPostgresUser = (req, res) => {
  const { nome, departamento } = req.body;
  postgresClient.query(
    'INSERT INTO usuario (nome, departamento) VALUES ($1, $2) RETURNING *',
    [nome, departamento],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuario criado!', user: results.rows[0] });
    }
  );
};

const updatePostgresUser = (req, res) => {
  const { id } = req.params;
  const { nome, departamento } = req.body;
  postgresClient.query(
    'UPDATE usuario SET nome = $1, departamento = $2 WHERE id = $3 RETURNING *',
    [nome, departamento, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Usuario Atualizado!', user: results.rows[0] });
    }
  );
};

const deletePostgresUser = (req, res) => {
  const { id } = req.params;
  postgresClient.query(
    'DELETE FROM usuario WHERE id = $1 RETURNING *',
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Usuario Deletado!', user: results.rows[0] });
    }
  );
};

// Operações MongoDB
const getMongoUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(users);
  });
};

const createMongoUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario criado!', user });
  });
};

const updateMongoUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario Atualizado!', user });
  });
};

const deleteMongoUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario Deletado!', user });
  });
};

module.exports = {
  getMySQLUsers, createMySQLUser, updateMySQLUser, deleteMySQLUser,
  getPostgresUsers, createPostgresUser, updatePostgresUser, deletePostgresUser,
  getMongoUsers, createMongoUser, updateMongoUser, deleteMongoUser
};
