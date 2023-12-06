// router initialization
const express = require('express');
const router = express.Router();
// Controller initialization
const listController = require('../controllers/listController')

// requests
router.post('/list', listController.createList);
router.get('/list', listController.getLists);
router.get('/list/:id', listController.getOneList);
router.put('/list/:id', listController.updateList);
router.delete('/list/:id', listController.deleteList);

module.exports = router;