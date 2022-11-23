const { list, create, main, detail, _delete} = require('../controller/ad');
const { isLoggedIn_client } = require('../controller/middleware');
const express = require('express');
const router = express.Router();


router.get('/main', main);
router.get('/list', list);
router.get('/detail', detail);
router.post('/create', isLoggedIn_client, create);
router.post('/delete', isLoggedIn_client, _delete);

module.exports = router;