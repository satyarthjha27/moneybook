const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware');
const  transactionController = require('../../Controller/transactionController');

router.use(auth.verifyToken);

router.post('/create', transactionController.create);
router.delete('/delete', transactionController.delete);
router.put('/update',transactionController.update);

module.exports = router;