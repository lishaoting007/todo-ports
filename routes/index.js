const { Router } = require('express');
const router = Router();
const userRoutes = require('../routes/user');
const smsCodeRoutes = require('./smsCode');
const todoRoutes = require('./todo');

router.use('/user', userRoutes);
router.use('/code', smsCodeRoutes);
router.use('/todo', todoRoutes);

module.exports = router;
