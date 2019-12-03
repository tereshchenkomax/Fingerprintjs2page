const router = require('express-promise-router')();

const userController = require('../controllers/usersController');

router.route('/')
	.post(userController.getUser);

router.route('/allusers')
	.post(userController.getAllUsers);

module.exports = router;
