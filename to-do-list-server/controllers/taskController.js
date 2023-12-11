// connect db
const db = require("../db/db");

class taskController {
  async createTask(req, res) {
    const {
      title,
      description,
      important,
      myDay,
      startTime,
      endTime,
      deadline,
      listId,
      isDone
    } = req.body;

    if (!title) {
      throw new Error('Title is required');
    }

    const newTask = await db.query(
      `INSERT INTO task(
            title,
            description,
            important,
            my_day,
            start_time,
            end_time,
            deadline,
            list_id,
            is_done
        ) 
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
      [
        title,
        description,
        important,
        myDay,
        startTime,
        endTime,
        deadline,
        listId,
        isDone
      ]
    );
    return res.status(200).json(newTask.rows[0]);
  }

  async updateTask(req, res) {
    const {
      title,
      description,
      important,
      myDay,
      startTime,
      endTime,
      deadline,
      listId,
      isDone
    } = req.body;
    const id = Number(req.params.id);

    if (!title) {
      throw new Error('Title is required');
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
        important,
        myDay,
        startTime,
        endTime,
        deadline,
        listId,
        isDone,
        id,
      ]
    );
    if (updatedTask.rows.length === 0) {
      throw new Error('Incorrect id');
    }
    return res.status(200).json(updatedTask.rows[0]);
  }

  async deleteTask(req, res) {
    const id = Number(req.params.id);
    const deletedTask = await db.query(
      `DELETE FROM task WHERE id = $1 RETURNING id`,
      [id]
    );
    if (deletedTask.rows.length === 0) {
      throw new Error('Incorrect id');
    }
    return res.status(200).json(deletedTask.rows[0]);
  }

  async getOneTask(req, res) {
    const id = req.params.id;
    const task = await db.query(`SELECT * FROM task WHERE id = $1`, [id]);

    if (task.rows.length === 0) {
      throw new Error('Incorrect id');
    }
    
    return res.status(200).json(task.rows[0]);
  }
}

module.exports = new taskController();
