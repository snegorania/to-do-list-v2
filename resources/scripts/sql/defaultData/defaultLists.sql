-- Active: 1700642508740@@127.0.0.1@5432@todolist
INSERT INTO list(
    title,
    description,
    important,
    my_day,
    tasks,
    is_users,
    list_user_id
) 
VALUES 
('Important', NULL, TRUE, FALSE, FALSE, FALSE, 1),
('My Day', NULL, FALSE, TRUE, FALSE, FALSE, 1),
('Tasks', NULL, FALSE, FALSE, TRUE, FALSE, 1),
('Learn react', 'Some staps to learn react', FALSE, FALSE, FALSE, TRUE, 1),
('Learn SQL', NULL, FALSE, FALSE, FALSE, TRUE, 1),
('Learn express', 'Some staps to learn express', FALSE, FALSE, FALSE, TRUE, 1);
