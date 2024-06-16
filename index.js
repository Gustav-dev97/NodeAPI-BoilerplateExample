const express = require('express')
const app = express()

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.get('/foo', function (req, res) {
    res.json({"foo": "bar"});
});

app.use(express.urlencoded({
  extended: true
}));

app.post('/bar', function(req, res) {
  var body = req.body;
  console.log(req.body.foo);
  res.send(req.body.foo);
});

app.put('/foo/:id', function (req, res) {
    console.log(`Atualizando foo com id ${req.params.id}`);
    res.send(`Foo ${req.params.id} atualizado com sucesso!`);
});
  
app.delete('/foo/:id', function (req, res) {
    console.log(`Deletando foo com id ${req.params.id}`);
    res.send(`Foo ${req.params.id} deletado com sucesso!`);
});

//MySQL Exemplo
const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    connectionLimit: 10
})

pool.query(`select * from apidb.user`, (err, res)=>{
    return console.log(res)
})  

// PostgreSQL Exemplo (PORT 5432)

const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "apidb"
})

client.connect();

client.query(`SELECT * FROM usuario`, (err, res)=>{
  if (!err){
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
})  

// MongoDB Exemplo

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://0.0.0.0:27017/apidb",{
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, (err)=>{
  if (err){
    console.log(err)
  } else {
    console.log("Conectado com Sucesso!")
  }
})

// Definir um esquema para a coleção 'usuarios'
//const usuarioSchema = new Schema({
  //nome: String,
  //departamento: String
//});

// Criar um modelo baseado no esquema
//const Usuario = mongoose.model('Usuario', usuarioSchema);

// Inserir um novo documento na coleção 'usuarios'
//const novoUsuario = new Usuario({
  //nome: 'Gustavo',
  //departamento: 'Desenvolvimento'
//});

//novoUsuario.save((err) => {
  //if (err) {
    //console.log(err);
  //} else {
    //console.log("Documento inserido com sucesso!");
  //}
//});

// Definir um esquema para a coleção 'usuarios'
const usuarioSchema = new Schema({
  nome: String,
  departamento: String
});

// Criar um modelo baseado no esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Array de usuários para inserir
const usuariosParaInserir = [
  { nome: 'Gustavo', departamento: 'Desenvolvimento' },
  { nome: 'Jose', departamento: 'Teste' }
];

// Usar insertMany para inserir vários documentos
Usuario.insertMany(usuariosParaInserir, (err, docs) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Usuários inseridos com sucesso:", docs);
  }
});