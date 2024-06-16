const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// Testes para a API MySQL
describe('API MySQL', () => {
  it('deve obter todos os usuários (GET /users/mysql)', async () => {
    const response = await request(app).get('/users/mysql');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve criar um novo usuário (POST /users/mysql)', async () => {
    const newUser = { nome: 'Teste', departamento: 'QA' };
    const response = await request(app).post('/users/mysql').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('userId');
  });

  it('deve atualizar um usuário existente (PUT /users/mysql/:id)', async () => {
    const updatedUser = { nome: 'Teste Atualizado', departamento: 'Desenvolvimento' };
    const response = await request(app).put('/users/mysql/1').send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  it('deve deletar um usuário (DELETE /users/mysql/:id)', async () => {
    const response = await request(app).delete('/users/mysql/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted');
  });
});

// Testes para a API PostgreSQL
describe('API PostgreSQL', () => {
  it('deve obter todos os usuários (GET /users/postgres)', async () => {
    const response = await request(app).get('/users/postgres');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve criar um novo usuário (POST /users/postgres)', async () => {
    const newUser = { nome: 'Teste', departamento: 'QA' };
    const response = await request(app).post('/users/postgres').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('id');
  });

  it('deve atualizar um usuário existente (PUT /users/postgres/:id)', async () => {
    const updatedUser = { nome: 'Teste Atualizado', departamento: 'Desenvolvimento' };
    const response = await request(app).put('/users/postgres/1').send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  it('deve deletar um usuário (DELETE /users/postgres/:id)', async () => {
    const response = await request(app).delete('/users/postgres/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted');
  });
});

// Testes para a API MongoDB
describe('API MongoDB', () => {
  it('deve obter todos os usuários (GET /users/mongo)', async () => {
    const response = await request(app).get('/users/mongo');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve criar um novo usuário (POST /users/mongo)', async () => {
    const newUser = { nome: 'Teste', departamento: 'QA' };
    const response = await request(app).post('/users/mongo').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
  });

  it('deve atualizar um usuário existente (PUT /users/mongo/:id)', async () => {
    const updatedUser = { nome: 'Teste Atualizado', departamento: 'Desenvolvimento' };
    const response = await request(app).put('/users/mongo/60b9c6d5f0a5b0cfd6d1f6a1').send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  it('deve deletar um usuário (DELETE /users/mongo/:id)', async () => {
    const response = await request(app).delete('/users/mongo/60b9c6d5f0a5b0cfd6d1f6a1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted');
  });
});
