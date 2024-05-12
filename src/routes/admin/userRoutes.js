const express = require('express');

const userController = require('../../controller/admin/userController')

const router = express.Router();

router.route('/').get(userController.getUsers)
.post(userController.createUser);

router.route('/:id').put(userController.updateUser).
delete(userController.deleteUser)
.patch(userController.toBlackList);

module.exports = router;