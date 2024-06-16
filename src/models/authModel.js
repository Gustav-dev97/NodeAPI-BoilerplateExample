const { Schema, model } = require('mongoose');

// Esquema de Usuário para Autenticação
const userAuthSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserAuth = model('UserAuth', userAuthSchema);

module.exports = UserAuth;
