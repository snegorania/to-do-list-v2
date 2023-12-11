SELECT 
    task.id as task_id,
    task.title as task_description,
    task.is_done,
    task.description,
    task.important,
    task.my_day,
    task.start_time,
    task.end_time,
    task.deadline,
    task.list_id,
    tag.id as tag_id,
    tag.title as tag_title,
    tag.tag_user_id
FROM 
    task LEFT JOIN tag_list_table ON task.id = tag_list_table.task_id 
    LEFT JOIN tag ON tag_list_table.tag_id = tag.id 
WHERE list_id = 4;