CREATE DATABASE IF NOT EXISTS apidb;

USE apidb;

CREATE TABLE IF NOT EXISTS user
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    departamento VARCHAR(255)
);

INSERT INTO user (nome, departamento) VALUES ('Gustavo', 'Desenvolvimento'), ('José', 'Teste');

select * from apidb.user;