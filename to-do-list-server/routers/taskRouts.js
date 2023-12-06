// router initialization
const express = require('express');
const router = new express.Router();
// Controller initialization
const taskController = require('../controllers/taskController');

// requests 
router.post('/task', taskController.createTask);
router.get('/task/:id', taskController.getOneTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;