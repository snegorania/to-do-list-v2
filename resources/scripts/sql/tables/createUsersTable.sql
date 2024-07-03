-- Active: 1700642508740@@127.0.0.1@5432@todolist
CREATE TABLE app_user(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);