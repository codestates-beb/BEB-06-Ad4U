const { apply, cancel, conference, proceed, contract, complete, _break} = require('../controller/function');
const { isLoggedIn_client, isLoggedIn_supplier, isLoggedIn } = require('../controller/middleware');
const express = require('express');
const router = express.Router();


router.post('/apply', isLoggedIn_supplier, apply);
router.post('/cancel', isLoggedIn_supplier, cancel);
router.post('/conference', isLoggedIn_client, conference);
router.post('/proceed', isLoggedIn_supplier, proceed);
router.post('/contract', isLoggedIn_client, contract);
router.post('/complete', isLoggedIn, complete);
router.post('/break', isLoggedIn,  _break);

module.exports = router;