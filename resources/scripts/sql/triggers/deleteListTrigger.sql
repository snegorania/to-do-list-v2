CREATE OR REPLACE FUNCTION delete_tasks_from_list() RETURNS trigger 
LANGUAGE plpgsql 
AS $$ BEGIN
   DELETE FROM task WHERE list_id = OLD.id;
   RETURN OLD;
END; $$;

CREATE TRIGGER delete_list
   BEFORE DELETE ON list FOR EACH ROW
   EXECUTE PROCEDURE delete_tasks_from_list();

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
('test', 'Some staps to learn react', FALSE, FALSE, FALSE, TRUE, 1);

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
('Learn basics of HTML', 'Learn tags and attributes', TRUE, FALSE, NULL, NULL, NULL, 15, FALSE, 1);

INSERT INTO tag_list_table(
    task_id,
    tag_id
) 
VALUES
(44, 1);

DELETE FROM list WHERE id = 15;