const express = require('express');

const authController = require('../../controller/authController')

const router = express.Router();

router.route('/login').post(authController.auth);


module.exports = router;