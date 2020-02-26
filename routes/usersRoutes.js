const router = require('express-promise-router')();

const UserController = require('../controllers/usersController');

router.route('/')
	.post(UserController.getUser);

router.route('/editorcontent')
	.get(UserController.getUserEditorContent)
	.post(UserController.setUserEditorContent);

router.route('/allusers')
	.get(UserController.getAllUsers);

module.exports = router;