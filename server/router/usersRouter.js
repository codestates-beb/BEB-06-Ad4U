const { signup, login, refresh, mypage } = require('../controller/users');
const express = require('express');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', refresh);
router.get('/mypage', mypage);


module.exports = router;