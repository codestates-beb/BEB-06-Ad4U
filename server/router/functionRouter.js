const { apply, cancel} = require('../controller/function');
const express = require('express');
const router = express.Router();


router.get('/apply', apply);
router.get('/cancel', cancel);

module.exports = router;