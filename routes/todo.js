const { Router } = require('express');
const router = Router();
const { addTodo, getTodo } = require('../controller/todo');

router.post('/', addTodo);
router.get('/', getTodo);

module.exports = router;
