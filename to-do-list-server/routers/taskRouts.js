// router initialization
const Router = require('express');
const router = new Router();
// Controller initialization
const taskController = require('../controllers/taskController');

// requests 
router.post('/task', taskController.createTask);
router.get('/task', taskController.getTasks);
router.delete('/task/:id', taskController.deleteTasks);

module.exports = router;