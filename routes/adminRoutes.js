const router = require('express-promise-router')();

const AdminController = require('../controllers/adminController');

router.route('/')
	.post(AdminController.login);


module.exports = router;
