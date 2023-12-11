const express = require('express');
const tryCatch = require('../utils/tryCatch');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.get('/tag', tryCatch(tagController.getAllTags));
router.get('/tag/:id', tryCatch(tagController.getOneTag));
router.post('/tag', tryCatch(tagController.createTag));
router.put('/tag/:id',tryCatch(tagController.updateTag));
router.delete('/tag/:id', tryCatch(tagController.deleteTag));

module.exports = router;