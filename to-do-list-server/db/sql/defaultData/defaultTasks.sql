-- Active: 1700642508740@@127.0.0.1@5432@todolist
INSERT INTO task(
    title,
    description,
    important,
    my_day,
    start_time,
    end_time,
    deadline,
    list_id,
    is_done,
    task_user_id
) 
VALUES
('Learn basics of HTML', 'Learn tags and attributes', TRUE, FALSE, NULL, NULL, NULL, 24, FALSE, 1),
('Learn basics of CSS', 'Learn selectors and basic properties', FALSE, TRUE, NULL, NULL, NULL, 24, FALSE, 1),
('Learn basics of JS', 'Learn some basic JS sintax', TRUE, TRUE, NULL, NULL, NULL, 24, FALSE, 1),
('Learn basic algorithms', 'Read book about algorithms', FALSE, FALSE, NULL, NULL, NULL, 24, FALSE, 1),
('Get to know React basics', NULL, TRUE, FALSE, NULL, NULL, NULL, 24, FALSE, 1),
('Understand work with npm', NULL, FALSE, TRUE, NULL, NULL, NULL, 24, FALSE, 1),
('Understand work with API', NULL, TRUE, TRUE, NULL, NULL, NULL, 24, FALSE, 1),
('Learn Git', NULL, FALSE, FALSE, NULL, NULL, NULL, 24, FALSE, 1),
('Learn basics of table creation', 'Learn table creation sintax', TRUE, FALSE, NULL, NULL, '2024-12-05T00:00:00', 24, FALSE, 1),
('Learn basics of select in SQL', 'Learn select sintax', TRUE, TRUE, NULL, NULL, '2024-12-05T00:00:00', 24, FALSE, 1),
('Learn basics of JOINs', 'Learn JOINs', FALSE, FALSE, NULL, NULL, '2024-12-05T00:00:00', 25, FALSE, 1),
('Learn basics of types', 'Learn about types in SQL', FALSE, TRUE, NULL, NULL, '2024-12-05T00:00:00', 25, FALSE, 1),
('Learn basics of JS', NULL, TRUE, FALSE, NULL, NULL, '2024-12-05T00:00:00', 25, FALSE, 1),
('Learn work with Git', NULL, TRUE, TRUE, NULL, NULL, '2024-12-05T00:00:00', 25, FALSE, 1),
('Learn basics of API', NULL, FALSE, FALSE, NULL, NULL, '2024-12-05T00:00:00', 25, FALSE, 1),
('Learn basics of npm', NULL, FALSE, TRUE, NULL, NULL, '2024-12-05T00:00:00', 25, FALSE, 1),
('Learn basics of HTML', 'Learn tags and attributes', TRUE, FALSE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', NULL, 26, FALSE, 1),
('Learn basics of CSS', 'Learn selectors and basic properties', FALSE, TRUE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', NULL, 26, FALSE, 1),
('Learn basics of node js work with files', 'Learn fs module', TRUE, TRUE,'2024-12-04T14:00:00', '2024-12-04T18:00:00', NULL, 26, FALSE, 1),
('Learn basic algorithms', 'Read book about algorithms', FALSE, FALSE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', NULL, 26, FALSE, 1),
('Learn node js OS module', NULL, TRUE, FALSE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', NULL, 26, FALSE, 1),
('Understand worw about JS data structures', NULL, FALSE, TRUE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', NULL, 26, FALSE, 1),
('Understand Event loop', NULL, TRUE, TRUE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', NULL, 26, FALSE, 1),
('Learn mongoDB basics', NULL, FALSE, FALSE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', NULL, 26, FALSE, 1),
('Learn basics of table creation in SQL', 'Learn table creation sintax', TRUE, FALSE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Learn basics of select in SQL', 'Learn select sintax', TRUE, TRUE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Learn basics of JOINs', 'Learn JOINs', FALSE, FALSE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Learn basics of types', 'Learn about types in SQL', FALSE, TRUE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Learn typescript', NULL, TRUE, FALSE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Make your oun API', NULL, TRUE, TRUE, '2024-12-03T14:00:00', '2024-12-03T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Read documentation', NULL, FALSE, FALSE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1),
('Learn basics of Linux', NULL, FALSE, TRUE, '2024-12-04T14:00:00', '2024-12-04T18:00:00', '2024-12-05T00:00:00', 26, FALSE, 1);

DELETE FROM list WHERE id = 21 OR id = 22 OR id = 23;