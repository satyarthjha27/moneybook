const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware');

/* For Platform Authorisation */
router.use(auth.authorise);

router.use('/user', require('./userRoute'));
router.use('/book', require('./bookRoute'));

module.exports = router;