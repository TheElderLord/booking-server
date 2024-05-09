const express = require('express');

const requestController = require('../../controller/admin/requestController')

const router = express.Router();

router.route('/').get(requestController.getRequests).
post(requestController.createRequest);
router.route("/:id").patch(requestController.setStatus)
.delete(requestController.deleteRequest);

module.exports = router;