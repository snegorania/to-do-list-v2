// router initialization
const Router = require('express');
const router = new Router();
// Controller initialization
const listController = require('../controllers/listController')

// requests
router.post('/lists', listController.createList);
router.get('/lists', listController.getLists);

module.exports = router;