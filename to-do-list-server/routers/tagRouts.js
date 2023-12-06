const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.get('/tag', tagController.getAllTags);
router.get('/tag/:id', tagController.getOneTag);
router.post('/tag', tagController.createTag);
router.put('/tag/:id',tagController.updateTag);
router.delete('/tag/:id', tagController.deleteTag);

module.exports = router;