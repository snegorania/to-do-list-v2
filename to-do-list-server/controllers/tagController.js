const db = require("../db/db");

class tagController {
  async createTag(req, res) {
    const { title, userId } = req.body;

    if (!title) {
      throw new Error('Title is required');
    }

    const newTag = await db.query(
      `INSERT INTO tag(
            title,
            tag_user_id
        ) VALUES ($1, $2) RETURNING *;`,
      [title, userId]
    );

    return res.status(200).json(newTag.rows[0]);
  }

  async updateTag(req, res) {
    const { title } = req.body;
    const id = req.params.id;

    if (!title) {
      throw new Error('Title is required');
    }

    const updatedTag = await db.query(
      `UPDATE tag
      SET title = $1
      WHERE id = $2 RETURNING *;`,
      [title, id]
    );

    if (updatedTag.rows.length === 0) {
      throw new Error('Incorrect id');
    }

    return res.status(200).json(updatedTag.rows[0]);
  }

  async deleteTag(req, res) {
    const id = req.params.id;

    const deletedTag = await db.query(
        `DELETE FROM tag WHERE id = $1 RETURNING id;`, [id]
    );

    if (deletedTag.rows.length === 0) {
      throw new Error('Incorrect id');
    }

    return res.status(200).json(deletedTag.rows[0]);
  }

  async getOneTag(req, res) {
    const id = req.params.id;

    const tag = await db.query(
        `SELECT * FROM tag WHERE id = $1;`, [id]
    );

    if (tag.rows.length === 0) {
      throw new Error('Incorrect id');
    }

    return res.status(200).json(tag.rows[0]);
  }

  async getAllTags(req, res) {
    
    const tag = await db.query(
        `SELECT * FROM tag;`
    );

    return res.status(200).json(tag.rows);
  }
}

module.exports = new tagController();
