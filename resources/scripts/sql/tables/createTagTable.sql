-- Active: 1700642508740@@127.0.0.1@5432@todolist
CREATE TABLE tag(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tag_user_id INTEGER,
    FOREIGN KEY (tag_user_id) REFERENCES app_user(id)
);
