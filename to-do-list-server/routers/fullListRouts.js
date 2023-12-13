const express = require("express");
const router = express.Router();
const tryCatch = require("../utils/tryCatch");
const db = require("../db/db");

router.get(
  "/full-list/:id",
  tryCatch(async (req, res) => {
    const id = req.params.id;
    const list = await db.query(`SELECT * FROM list WHERE id = $1`, [id]);

    if (list.rows.length === 0) {
      throw new Error("Incorrect id");
    }

    let allTasksWithTags;

    if (list.rows[0].important) {
      allTasksWithTags = await db.query(
        `SELECT 
          task.id as task_id,
          task.title as task_title,
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
          tag.tag_user_id FROM 
          task LEFT JOIN tag_list_table ON task.id = tag_list_table.task_id 
          LEFT JOIN tag ON tag_list_table.tag_id = tag.id WHERE task.important;`
      );
    } else if (list.rows[0].my_day) {
      allTasksWithTags = await db.query(
        `SELECT 
          task.id as task_id,
          task.title as task_title,
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
          tag.tag_user_id FROM 
          task LEFT JOIN tag_list_table ON task.id = tag_list_table.task_id 
          LEFT JOIN tag ON tag_list_table.tag_id = tag.id WHERE task.my_day;`
      );
    } else {
      allTasksWithTags = await db.query(
        `SELECT 
          task.id as task_id,
          task.title as task_title,
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
          tag.tag_user_id FROM 
          task LEFT JOIN tag_list_table ON task.id = tag_list_table.task_id 
          LEFT JOIN tag ON tag_list_table.tag_id = tag.id WHERE list_id = $1;`,
        [id]
      );
    }

    const map = allTasksWithTags.rows.reduce((r, i) => {
      r[i.task_id] = r[i.task_id] || [];
      r[i.task_id].push(i);
      return r;
    }, {});

    const tasks = [];

    for (let key in map) {
      tasks.push({
        id: map[key][0].task_id,
        title: map[key][0].task_title,
        description: map[key][0].description,
        isDone: map[key][0].is_done,
        isImportant: map[key][0].important,
        isMyDay: map[key][0].my_day,
        startTime: map[key][0].start_time,
        endTime: map[key][0].end_time,
        deadline: map[key][0].deadline,
        listId: map[key][0].list_id,
        tags: map[key][0].tag_id
          ? map[key].map((el) => {
              return { id: el.tag_id, title: el.tag_title };
            })
          : [],
      });
    }

    const fullList = {
      id: list.rows[0].id,
      title: list.rows[0].title,
      description: list.rows[0].description,
      isImportant: list.rows[0].important,
      isUsers: list.rows[0].is_users,
      isMyDay: list.rows[0].my_day,
      isTasks: list.rows[0].tasks,
      tasks: tasks,
      userId: list.rows[0].list_user_id
    };

    return res.status(200).json(fullList);
  })
);

module.exports = router;
