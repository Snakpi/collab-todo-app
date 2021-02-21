CREATE DATABASE api;

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  author_id INT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL,
  bio VARCHAR(255),
  age INT
);

ALTER TABLE todos
ADD FOREIGN KEY (author_id) 
REFERENCES users (id);