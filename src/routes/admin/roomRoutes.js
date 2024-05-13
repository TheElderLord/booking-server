const express = require('express');

const roomController = require('../../controller/admin/roomController')

const router = express.Router();

router.route('/list').get(roomController.getRooms).
post(roomController.uploadImages,roomController.createRoom);


router.route('/list/:id').get(roomController.getRoom).
delete(roomController.deleteRoom)
.put(roomController.updateRoom);



// put(roomController.setFree);




router.route('/bookHistory').get(roomController.getBookHistory);

router.route('/bookHistory/:id').get(roomController.getBookHistoryById)
.post(roomController.bookRoom)
.delete(roomController.deleteHistory)
.put(roomController.setPaid)
.patch(roomController.setGiven);


module.exports = router;