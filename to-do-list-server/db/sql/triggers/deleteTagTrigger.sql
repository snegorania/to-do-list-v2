-- Active: 1700642508740@@127.0.0.1@5432@todolist
CREATE OR REPLACE FUNCTION delete_tags_from_tag_list() RETURNS trigger 
LANGUAGE plpgsql 
AS $$ BEGIN
   DELETE FROM tag_list_table WHERE tag_id = OLD.id;
   RETURN OLD;
END; $$;

CREATE TRIGGER delete_task
   BEFORE DELETE ON tag FOR EACH ROW
   EXECUTE PROCEDURE delete_tags_from_tag_list();

INSERT INTO tag(
    title,
    tag_user_id
) 
VALUES
('test Tag', 1);

INSERT INTO tag_list_table(
    task_id,
    tag_id
) 
VALUES
(1, 9);

DELETE FROM tag WHERE id = 9;