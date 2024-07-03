-- Active: 1700642508740@@127.0.0.1@5432@todolist
SELECT * FROM task;
SELECT * FROM tag;

INSERT INTO tag_list_table(
    task_id,
    tag_id
) 
VALUES
(50, 1),
(50, 2),
(50, 3),
(51, 1),
(51, 2),
(52, 1),
(53, 11),
(59, 11),
(58, 2),
(54, 3),
(55, 11),
(56, 2); 

SELECT task_id 
FROM tag_list_table 
WHERE tag_id = 1 OR tag_id = 2 
GROUP BY task_id 
HAVING COUNT(tag_id) = 2;


SELECT 
    task.id AS task_id,
    task.title AS task_title,
    task.is_done AS task_is_done,
    task.description AS task_description,
    task.important AS task_important,
    task.my_day AS task_my_day,
    task.start_time AS task_start_time,
    task.end_time AS task_end_time,
    task.deadline AS task_deadline,
    task.list_id AS task_list_id,
    tag.id AS tag_id,
    tag.title AS tag_title,
    tag.tag_user_id AS user_tag_id
FROM 
    task LEFT JOIN tag_list_table ON task.id = tag_list_table.task_id 
    LEFT JOIN tag ON tag_list_table.tag_id = tag.id;


SELECT tag_list_table.task_id AS filtered_tasks 
FROM tag_list_table 
WHERE tag_list_table.tag_id = 1 OR tag_list_table.tag_id = 2 
GROUP BY task_id 
HAVING COUNT(tag_id) = 2;

SELECT 
task_id,
task_title,
task_is_done,
task_description,
task_important,
task_my_day,
task_start_time,
task_end_time,
task_deadline,
task_list_id,
tag_id,
tag_title,
user_tag_id
FROM (SELECT 
    task.id AS task_id,
    task.title AS task_title,
    task.is_done AS task_is_done,
    task.description AS task_description,
    task.important AS task_important,
    task.my_day AS task_my_day,
    task.start_time AS task_start_time,
    task.end_time AS task_end_time,
    task.deadline AS task_deadline,
    task.list_id AS task_list_id,
    tag.id AS tag_id,
    tag.title AS tag_title,
    tag.tag_user_id AS user_tag_id
FROM 
    task LEFT JOIN tag_list_table ON task.id = tag_list_table.task_id 
    LEFT JOIN tag ON tag_list_table.tag_id = tag.id) AS all_tasks INNER JOIN (SELECT tag_list_table.task_id AS filtered_tasks 
FROM tag_list_table 
WHERE tag_list_table.tag_id = 1 OR tag_list_table.tag_id = 2 OR tag_list_table.tag_id = 3
GROUP BY task_id 
HAVING COUNT(tag_id) = 3) AS filtered ON all_tasks.task_id = filtered.filtered_tasks;