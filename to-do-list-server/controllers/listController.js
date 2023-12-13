const db = require("../db/db");

function converter(data) {
  const arr = [];
  for (i = 0; i < data.rows.length; i++) {
    arr.push({
      id: data.rows[i].id,
      title: data.rows[i].title,
      description: data.rows[i].description,
      isImportant: data.rows[i].important,
      isMyDay: data.rows[i].my_day,
      isUsers: data.rows[i].is_users,
      isTasks: data.rows[i].tasks,
      userId: data.rows[i].list_user_id,
    });
  }

  return arr;
}

class ListController {

  async createList(req, res) {
    const { title, description, userId } = req.body;

    if (!title) {
      throw new Error("Title is required");
    }

    const newList = await db.query(
      `INSERT INTO list(
                    title,
                    description,
                    important,
                    my_day,
                    tasks,
                    is_users,
                    list_user_id
                ) 
                VALUES 
                ($1, $2, FALSE, FALSE, FALSE, TRUE, $3) RETURNING *;`,
      [title, description, userId]
    );
    const convertedData = converter(newList);
    return res.status(200).json(convertedData[0]);
  }

  async updateList(req, res) {
    const { title, description, userId } = req.body;
    const id = Number(req.params.id);
    if (!title) {
      throw new Error("Title is required");
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
      throw new Error("Incorrect id");
    }
    const convertedData = converter(updatedList);
    return res.status(200).json(convertedData[0]);
  }

  async deleteList(req, res) {
    const id = Number(req.params.id);
    const deletedList = await db.query(
      `DELETE FROM list WHERE id = $1 RETURNING id`,
      [id]
    );

    if (deletedList.rows.length === 0) {
      throw new Error("Incorrect id");
    }

    return res.status(200).json(deletedList.rows[0].id);
  }

  async getOneList(req, res) {
    const id = req.params.id;
    const list = await db.query(`SELECT * FROM list WHERE id = $1`, [id]);
    if (list.rows.length === 0) {
      throw new Error("Incorrect id");
    }
    const convertedData = converter(list);
    return res.status(200).json(convertedData[0]);
  }

  async getLists(req, res) {
    const lists = await db.query(`SELECT * FROM list`);
    const convertedData = converter(lists);
    return res.status(200).json(convertedData);
  }
}

module.exports = new ListController();
