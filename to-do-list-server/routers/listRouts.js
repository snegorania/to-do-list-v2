// router initialization
const express = require('express');
const router = express.Router();
const tryCatch = require('../utils/tryCatch');
// Controller initialization
const listController = require('../controllers/listController')

// requests
router.post('/list', tryCatch(listController.createList));
router.get('/list', tryCatch(listController.getLists));
router.get('/list/:id', tryCatch(listController.getOneList));
router.put('/list/:id', tryCatch(listController.updateList));
router.delete('/list/:id', tryCatch(listController.deleteList));

module.exports = router;