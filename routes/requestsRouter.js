const express = require('express');

const requestController = require('../controller/requestController')

const router = express.Router();

router.route('/').get(requestController.getRequests).
post(requestController.createRequest);
router.patch('/:id',requestController.setStatus)

module.exports = router;