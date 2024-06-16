const mysql = require('mysql');
const { Client } = require('pg');
const mongoose = require('mongoose');

// MySQL
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: 'root',
  password: '',
  database: 'apidb',
  connectionLimit: 10
});

// Verificação de conexão MySQL (Remover após verificação inicial)
mysqlPool.query('SELECT * FROM user', (err, res) => {
  if (err) {
    console.log('MySQL: Erro de Conexao:', err);
  } else {
    console.log('MySQL: Conectado com Sucesso. Resultados:', res);
  }
});

// PostgreSQL
const postgresClient = new Client({
  host: process.env.POSTGRES_HOST || 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'root',
  database: 'apidb'
});

postgresClient.connect(err => {
  if (err) {
    console.log('PostgreSQL Erro de Conexao:', err);
  } else {
    console.log('Conectado ao PostgreSQL');
  }
});

// MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/apidb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log("MongoDB Erro de Conexao:", err);
  } else {
    console.log("Conectado ao MongoDB");
  }
});

module.exports = { mysqlPool, postgresClient, mongoose };
