const db = require("../db/db");

class ListController {
  async createList(req, res) {
    const { title, description, userId } =
      req.body;

    if (!title) {
      throw new Error('Title is required');
    }

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
                ($1, $2, FALSE, FALSE, FALSE, TRUE, $3) RETURNING *;`,
      [title, description, userId]
    );
    return res.status(200).json(newList.rows[0]);
  }

  async updateList(req, res) {
    const { title, description, userId } =
      req.body;
    const id = Number(req.params.id);
    if (!title) {
      throw new Error('Title is required');
    }
    const updatedList = await db.query(
      `UPDATE list
      SET title = $1, 
          description = $2, 
          list_user_id = $3
      WHERE id = $4 RETURNING *;`,
      [title, description, userId, id]
    );

    if (updatedList.rows.length === 0) {
      throw new Error('Incorrect id');
    }
    return res.status(200).json(updatedList.rows[0]);
  }

  async deleteList(req, res) {
    const id = Number(req.params.id);
    const deletedList = await db.query(
        `DELETE FROM list WHERE id = $1 RETURNING id`,
      [id]
    );
    if (deletedList.rows.length === 0) {
      throw new Error('Incorrect id');
    }
    return res.status(200).json(deletedList.rows[0]);
  }

  async getOneList(req, res) {
    const id = req.params.id;
    const list = await db.query(`SELECT * FROM list WHERE id = $1`, [id]);
    if (list.rows.length === 0) {
      throw new Error('Incorrect id');
    }
    return res.status(200).json(list.rows[0]);
  }

  async getLists(req, res) {
    const list = await db.query(`SELECT * FROM list`);
    return res.status(200).json(list.rows);
  }
}

module.exports = new ListController();
