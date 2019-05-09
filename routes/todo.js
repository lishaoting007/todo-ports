const { Router } = require('express');
const router = Router();
const { addTodo, getTodo, getAllTodo } = require('../controller/todo');

router.post('/', addTodo);
router.get('/', getTodo);
router.get('/all', getAllTodo);

module.exports = router;
