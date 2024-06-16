const { mysqlPool, postgresClient, mongoose } = require('../config/database');
const { Schema, model } = mongoose;

// MongoDB User Schema
const userSchema = new Schema({
  nome: String,
  departamento: String
});
const User = model('User', userSchema);

// MySQL
const getUsersMySQL = (callback) => {
  mysqlPool.query('SELECT * FROM user', callback);
};

// PostgreSQL
const getUsersPostgres = (callback) => {
  postgresClient.query('SELECT * FROM usuario', callback);
};

module.exports = { User, getUsersMySQL, getUsersPostgres };
