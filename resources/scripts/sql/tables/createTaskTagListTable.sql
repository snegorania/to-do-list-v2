-- Active: 1700642508740@@127.0.0.1@5432@todolist
CREATE TABLE tag_list_table(
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (task_id) REFERENCES task(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);