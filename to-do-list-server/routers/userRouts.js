// router initialization
const Router = require('express');
const router = new Router();
// Controller initialization
const userController = require('../controllers/userController');

// requests 
router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);

module.exports = router;