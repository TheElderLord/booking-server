const express = require('express');

const roomListController = require('../controller/roomListController')

const router = express.Router();

router.route('/').get(roomListController.getList).
post(roomListController.createRoomList);

router.route('/:id').delete(roomListController.deleteItem)
.put(roomListController.setPaid);

router.route('/download').get(roomListController.downloadExcel)

router.route('/rooms').get(roomListController.getRooms);

module.exports = router;