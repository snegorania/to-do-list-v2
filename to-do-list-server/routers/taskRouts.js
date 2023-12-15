// router initialization
const express = require('express');
const tryCatch = require('../utils/tryCatch');
const router = new express.Router();
// Controller initialization
const taskController = require('../controllers/taskController');

// requests 
router.post('/task', tryCatch(taskController.createTask));
router.put('/task/:id', tryCatch(taskController.updateTask));
router.put('/task/status/:id', tryCatch(taskController.updateTaskStatus));
router.delete('/task/:id', tryCatch(taskController.deleteTask));
router.get('/task/filtered', tryCatch(taskController.getFilteredTasks));

module.exports = router;