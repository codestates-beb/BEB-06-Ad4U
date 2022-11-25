const {list, main,detail, inputInfo} = require('../controller/client');
const { isLoggedIn_client } = require('../controller/middleware');
const express = require('express');
const router = express.Router();


router.get('/main', main);
router.get('/list', list);
router.get('/detail', detail);
router.post('/inputInfo', isLoggedIn_client, inputInfo);

module.exports = router;