const { Router } = require('express');
const router = Router();
const {
  register,
  login,
  getUserData,
  changeUserMsg,
  changePassword,
  getAllUser
} = require('../controller/user');
const auth = require('../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/', auth, getUserData);
router.put('/', auth, changeUserMsg);
router.post('/changePassword', auth, changePassword);
router.get('/all', getAllUser);

module.exports = router;
