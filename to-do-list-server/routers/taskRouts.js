// router initialization
const express = require('express');
const tryCatch = require('../utils/tryCatch');
const router = new express.Router();
// Controller initialization
const taskController = require('../controllers/taskController');

// requests 
router.post('/task', tryCatch(taskController.createTask));
router.get('/task/:id', tryCatch(taskController.getOneTask));
router.put('/task/:id', tryCatch(taskController.updateTask));
router.delete('/task/:id', tryCatch(taskController.deleteTask));

module.exports = router;