const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware');
const bookController = require('../../Controller/bookController');

router.use(auth.verifyToken);

router.post('/create', bookController.create);

module.exports = router;