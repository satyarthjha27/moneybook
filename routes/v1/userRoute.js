const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware');

let authController = require('./../../Controller/authController');

router.post("/register",authController.register);
router.post("/login",authController.login);

router.use(auth.verifyToken);

router.put('/update',authController.userUpdate);

module.exports = router;