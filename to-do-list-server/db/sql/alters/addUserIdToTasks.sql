-- Active: 1700642508740@@127.0.0.1@5432@todolist
ALTER TABLE task ADD COLUMN task_user_id INTEGER;

UPDATE task 
SET task_user_id = 1;