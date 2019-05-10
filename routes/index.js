const { Router } = require('express');
const router = Router();
const userRoutes = require('../routes/user');
const smsCodeRoutes = require('./smsCode');
const todoRoutes = require('./todo');
const rankingRoutes = require('./ranking');

router.use('/user', userRoutes);
router.use('/code', smsCodeRoutes);
router.use('/todo', todoRoutes);
router.use('/ranking', rankingRoutes);

module.exports = router;
