CREATE OR REPLACE FUNCTION delete_tags_from_task() RETURNS trigger 
LANGUAGE plpgsql 
AS $$ BEGIN
   DELETE FROM tag_list_table WHERE task_id = OLD.id;
   RETURN OLD;
END; $$;

CREATE TRIGGER delete_task
   BEFORE DELETE ON task FOR EACH ROW
   EXECUTE PROCEDURE delete_tags_from_task();

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
('Basic task', 'Learn tags and attributes', TRUE, FALSE, NULL, NULL, NULL, 4, FALSE, 1);

INSERT INTO tag_list_table(
    task_id,
    tag_id
) 
VALUES
(36, 1),
(36, 2),
(36, 3);

DELETE FROM task WHERE id = 36;

