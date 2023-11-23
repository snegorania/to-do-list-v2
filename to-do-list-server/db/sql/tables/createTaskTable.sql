CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    important BOOLEAN,
    my_day BOOLEAN,
    start_time VARCHAR(100),
    end_time VARCHAR(100),
    deadline VARCHAR(100),
    list_id INTEGER,
    FOREIGN KEY (list_Id) REFERENCES list(id)
);
