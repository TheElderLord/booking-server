const express = require('express');

const userController = require('../controller/userController')

const router = express.Router();

router.route('/').get(userController.getUsers).
post(userController.createUser);

router.patch('/:id',userController.updateUser)

module.exports = router;