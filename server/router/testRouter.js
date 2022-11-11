const { findAll, test } = require('../controller/test');
const express = require('express');
const router = express.Router();

router.get('/', findAll);

router.get('/test', test);

module.exports = router;
