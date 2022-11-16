const { signup, login, auth, refresh, mypage } = require('../controller/users');

const express = require('express');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/auth', auth);
router.get('/refresh', refresh);
router.get('/mypage', mypage);



module.exports = router;
