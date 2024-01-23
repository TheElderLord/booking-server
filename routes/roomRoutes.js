const express = require('express');

const roomController = require('../controller/roomController')

const router = express.Router();

router.route('/').get(roomController.getRooms).
post(roomController.createRoom);


router.route('/:id').get(roomController.getRoom).
delete(roomController.deleteRoom);

router.route('/book/:id').post(roomController.bookRoom).
put(roomController.setFree)


router.route('/bookHistory/:id').get(roomController.getBookHistory);


module.exports = router;