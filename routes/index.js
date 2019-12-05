const express = require('express');
const router = express.Router();
const usersRoutes = require('./usersRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/users', usersRoutes);
router.use('/login', adminRoutes);

module.exports = router;
