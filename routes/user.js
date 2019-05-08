const { Router } = require('express');
const router = Router();
const { register, login, getUserData } = require('../controller/user');
const auth = require('../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/', auth, getUserData);

module.exports = router;
