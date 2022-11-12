const { findAll, create, render} = require('../controller/ad');
const express = require('express');
const router = express.Router();

router.get('/findAll', findAll);
router.get('/render', render)
router.post('/create', create);


module.exports = router;