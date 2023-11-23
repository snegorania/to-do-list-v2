// connect db
const db = require('../db');

class ListController {

    // add list from request to db
    async createList(req, res) {
        const {title, description, userId} = req.body;
        const newList = await db.query(`INSERT INTO lists (title, description, "userId") values ($1, $2, $3) RETURNING *`, [title, description, userId]);
        res.json(newList.rows[0]);
    }

    // get lists from db
    async getLists(req, res) {
        const lists = await db.query(`SELECT * FROM lists`);
        res.json(lists.rows);
    }
}

module.exports = new ListController();