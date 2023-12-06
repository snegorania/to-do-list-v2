const db = require("../db/db");

class ListController {
  async createList(req, res) {
    const { title, description, important, myDay, isTasks, isUsers, userId } =
      req.body;
    const newList = await db.query(
      `INSERT INTO list(
                    title,
                    description,
                    importand,
                    my_day,
                    tasks,
                    is_users,
                    list_user_id
                ) 
                VALUES 
                ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [title, description, important, myDay, isTasks, isUsers, userId]
    );
    res.json(newList.rows[0]);
  }

  async updateList(req, res) {
    const { title, description, important, myDay, isTasks, isUsers, userId } =
      req.body;
    const id = Number(req.params.id);
    const updatedList = await db.query(
      `UPDATE list
      SET title = $1, 
          description = $2, 
          importand = $3,
          my_day = $4,
          tasks = $5,
          is_users = $6,
          list_user_id = $7
      WHERE id = $8 RETURNING *;`,
      [title, description, important, myDay, isTasks, isUsers, userId, id]
    );
    res.json(updatedList.rows[0]);
  }

  async deleteList(req, res) {
    const id = Number(req.params.id);
    const deletedList = await db.query(
        `DELETE FROM list WHERE id = $1 RETURNING id`,
      [id]
    );
    res.json(deletedList.rows[0]);
  }

  async getOneList(req, res) {
    const id = req.params.id;
    const list = await db.query(`SELECT * FROM list WHERE id = $1`, [id]);
    res.json(list.rows[0]);
  }

  async getLists(req, res) {
    const id = req.params.id;
    const list = await db.query(`SELECT * FROM list`);
    res.json(list.rows);
  }
}

module.exports = new ListController();
