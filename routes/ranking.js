const { Router } = require('express');
const router = Router();
const { getRanking } = require('../controller/ranking');

router.get('/', getRanking);

module.exports = router;
