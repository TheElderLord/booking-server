const express = require('express');

const roomController = require('../../controller/user/roomController')

const router = express.Router();

router.route('/list/').get(roomController.getRooms)


router.route('/list/:id').get(roomController.getRoomById);

router.route('/request').post(roomController.createRequest);
router.route('/history/:id').get(roomController.getBookHistory);


module.exports = router;