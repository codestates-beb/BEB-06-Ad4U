const { apply, cancel, conference, proceed} = require('../controller/function');
const express = require('express');
const router = express.Router();


router.post('/apply', apply);
router.post('/cancel', cancel);
router.post('/conference', conference);
router.post('/proceed', proceed);

module.exports = router;