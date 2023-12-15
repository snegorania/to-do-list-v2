// connect db
const db = require("../db/db");

class taskController {
  async createTask(req, res) {
    const {
      title,
      description,
      isImportant,
      isMyDay,
      startTime,
      endTime,
      deadline,
      listId,
      isDone,
      userId,
      tags,
    } = req.body;

    if (!title) {
      throw new Error("Title is required");
    }

    const newTask = await db.query(
      `INSERT INTO task(title, description, important,
            my_day, start_time, end_time, deadline, list_id,
            is_done, task_user_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
      [
        title,
        description,
        isImportant,
        isMyDay,
        startTime,
        endTime,
        deadline,
        listId,
        isDone,
        userId,
      ]
    );

    let newFullTask;

    if (tags.length) {
      let tagListQuery = "INSERT INTO tag_list_table(task_id, tag_id) VALUES";
      for (let i = 0; i < tags.length; i++) {
        if (i === tags.length - 1) {
          tagListQuery = tagListQuery + `(${newTask.rows[0].id}, ${tags[i]})`;
        } else {
          tagListQuery = tagListQuery + `(${newTask.rows[0].id}, ${tags[i]}),`;
        }
      }

      tagListQuery = tagListQuery + " RETURNING task_id;";
      const taskId = await db.query(tagListQuery);

      const taskTags = await db.query(
        `SELECT tag.id, tag.title 
      FROM tag_list_table 
      INNER JOIN tag 
      ON tag.id = tag_list_table.tag_id  
      WHERE tag_list_table.task_id = $1;`,
        [taskId.rows[0].task_id]
      );

      newFullTask = {
        id: newTask.rows[0].id,
        title: newTask.rows[0].title,
        description: newTask.rows[0].description,
        isImportant: newTask.rows[0].important,
        isMyDay: newTask.rows[0].my_day,
        startTime: newTask.rows[0].start_time,
        endTime: newTask.rows[0].end_time,
        deadline: newTask.rows[0].deadline,
        listId: newTask.rows[0].list_id,
        isDone: newTask.rows[0].is_done,
        userId: newTask.rows[0].task_user_id,
        tags: taskTags.rows,
      };
    } else {
      newFullTask = {
        id: newTask.rows[0].id,
        title: newTask.rows[0].title,
        description: newTask.rows[0].description,
        isImportant: newTask.rows[0].important,
        isMyDay: newTask.rows[0].my_day,
        startTime: newTask.rows[0].start_time,
        endTime: newTask.rows[0].end_time,
        deadline: newTask.rows[0].deadline,
        listId: newTask.rows[0].list_id,
        isDone: newTask.rows[0].is_done,
        userId: newTask.rows[0].task_user_id,
        tags: [],
      };
    }

    return res.status(200).json(newFullTask);
  }

  async updateTask(req, res) {
    const {
      title,
      description,
      isImportant,
      isMyDay,
      startTime,
      endTime,
      deadline,
      listId,
      isDone,
      tags,
    } = req.body;

    const id = Number(req.params.id);

    if (!title) {
      throw new Error("Title is required");
    }

    const updatedTask = await db.query(
      `UPDATE task
          SET title = $1, 
              description = $2, 
              important = $3,
              my_day = $4,
              start_time = $5,
              end_time = $6,
              deadline = $7,
              list_id = $8,
              is_done = $9
          WHERE id = $10 RETURNING *;`,
      [
        title,
        description,
        isImportant,
        isMyDay,
        startTime,
        endTime,
        deadline,
        listId,
        isDone,
        id,
      ]
    );

    if (updatedTask.rows.length === 0) {
      throw new Error("Incorrect id");
    }

    const oldTags = await db.query(
      `SELECT tag_id FROM tag_list_table  
      WHERE task_id = $1;`,
      [updatedTask.rows[0].id]
    );

    const numberNewTags = tags.map((el) => Number(el));
    const numberOldTags = oldTags.rows.map((el) => Number(el.tag_id));

    const deleteTags = numberOldTags.filter(
      (el) => !numberNewTags.includes(el)
    );
    const addTags = numberNewTags.filter((el) => !numberOldTags.includes(el));

    if (deleteTags.length) {
      let deleteTagsQuery = `DELETE FROM tag_list_table 
      WHERE (task_id = ${updatedTask.rows[0].id} AND tag_id = ${deleteTags[0]})`;
      if (deleteTags.length > 1) {
        for (let i = 1; i < deleteTags.length; i++) {
          deleteTagsQuery =
            deleteTagsQuery +
            `OR (task_id = ${updatedTask.rows[0].id} AND tag_id = ${deleteTags[i]})`;
        }
      }

      await db.query(deleteTagsQuery + ";");
    }

    if (addTags.length) {
      let tagListQuery = "INSERT INTO tag_list_table (task_id, tag_id) VALUES";
      for (let i = 0; i < addTags.length; i++) {
        if (i === addTags.length - 1) {
          tagListQuery =
            tagListQuery + `(${updatedTask.rows[0].id}, ${addTags[i]})`;
        } else {
          tagListQuery =
            tagListQuery + `(${updatedTask.rows[0].id}, ${addTags[i]}),`;
        }
      }
      await db.query(tagListQuery + ";");
    }

    const taskTags = await db.query(
      `SELECT tag.id, tag.title 
    FROM tag_list_table 
    INNER JOIN tag 
    ON tag.id = tag_list_table.tag_id  
    WHERE tag_list_table.task_id = $1;`,
      [updatedTask.rows[0].id]
    );

    const updatedFullTask = {
      id: updatedTask.rows[0].id,
      title: updatedTask.rows[0].title,
      description: updatedTask.rows[0].description,
      isImportant: updatedTask.rows[0].important,
      isMyDay: updatedTask.rows[0].my_day,
      startTime: updatedTask.rows[0].start_time,
      endTime: updatedTask.rows[0].end_time,
      deadline: updatedTask.rows[0].deadline,
      listId: updatedTask.rows[0].list_id,
      isDone: updatedTask.rows[0].is_done,
      userId: updatedTask.rows[0].task_user_id,
      tags: taskTags.rows,
    };
    return res.status(200).json(updatedFullTask);
  }

  async deleteTask(req, res) {
    const id = Number(req.params.id);
    const deletedTask = await db.query(
      `DELETE FROM task WHERE id = $1 RETURNING id`,
      [id]
    );
    if (deletedTask.rows.length === 0) {
      throw new Error("Incorrect id");
    }
    return res.status(200).json(deletedTask.rows[0].id);
  }

  async updateTaskStatus(req, res) {
    const { isMyDay, isDone, isImportant } = req.body;
    const id = req.params.id;

    const updatedTask = await db.query(
      `UPDATE task
          SET important = $1,
              my_day = $2,
              is_done = $3
          WHERE id = $4 RETURNING id, important, my_day, is_done;`,
      [isImportant, isMyDay, isDone, id]
    );

    if (updatedTask.rows.length === 0) {
      throw new Error("Incorrect id");
    }

    const newStatus = {
      id: updatedTask.rows[0].id,
      isDone: updatedTask.rows[0].is_done,
      isMyDay: updatedTask.rows[0].my_day,
      isImportant: updatedTask.rows[0].important,
    };

    return res.status(200).json(newStatus);
  }

  async getFilteredTasks(req, res) {
    const filtersText = req.query.filters;
    if (filtersText) {
      const filters = filtersText.split(",");

      let getTasksQuery = `SELECT 
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
    WHERE tag_list_table.tag_id = ${filters[0]} `;
      if (filters.length > 1) {
        for (let i = 1; i < filters.length; i++) {
          getTasksQuery =
            getTasksQuery + `OR tag_list_table.tag_id = ${filters[i]} `;
        }
      }
      getTasksQuery =
        getTasksQuery +
        `GROUP BY task_id 
    HAVING COUNT(tag_id) = ${filters.length}) AS filtered ON all_tasks.task_id = filtered.filtered_tasks;`;

      const filteredTasksWithTags = await db.query(getTasksQuery);

      const map = filteredTasksWithTags.rows.reduce((r, i) => {
        r[i.task_id] = r[i.task_id] || [];
        r[i.task_id].push(i);
        return r;
      }, {});

      const tasks = [];

      for (let key in map) {
        tasks.push({
          id: map[key][0].task_id,
          title: map[key][0].task_title,
          description: map[key][0].task_description,
          isDone: map[key][0].task_is_done,
          isImportant: map[key][0].task_important,
          isMyDay: map[key][0].task_my_day,
          startTime: map[key][0].task_start_time,
          endTime: map[key][0].task_end_time,
          deadline: map[key][0].task_deadline,
          listId: map[key][0].task_list_id,
          tags: map[key].map((el) => {
            return { id: el.tag_id, title: el.tag_title };
          }),
        });
      }
      res.status(200).json(tasks);
    } else {
      res.status(200).json([]);
    }
  }
}

module.exports = new taskController();
