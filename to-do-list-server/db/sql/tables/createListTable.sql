-- Active: 1700642508740@@127.0.0.1@5432@todolist
CREATE TABLE list(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    important BOOLEAN,
    my_day BOOLEAN,
    tasks BOOLEAN,
    is_users BOOLEAN,
    list_user_id INTEGER,
    FOREIGN KEY (list_user_Id) REFERENCES app_user(id)
);