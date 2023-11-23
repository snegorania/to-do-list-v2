// get pool class
const Pool = require('pg').Pool;

// init pool object with data for postgres
const pool = new Pool({
    user: 'admin',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'ToDoList'
});

// export pool
module.exports = pool;
