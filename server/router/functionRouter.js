const { apply, cancel, conference, proceed, contract, complete, _break} = require('../controller/function');
const express = require('express');
const router = express.Router();


router.post('/apply', apply);
router.post('/cancel', cancel);
router.post('/conference', conference);
router.post('/proceed', proceed);
router.post('/contract', contract);
router.post('/complete', complete);
router.post('/break', _break);

module.exports = router;