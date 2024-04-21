const express = require('express');

const roomController = require('../../controller/user/roomController')

const router = express.Router();

router.route('/').get(roomController.getRooms)


router.route('/:id').get(roomController.getRoomById);

router.route('/request').post(roomController.createRequest);

module.exports = router;