const { signup, login, refresh } = require('../controller/users');
const express = require('express');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', refresh);


module.exports = router;
