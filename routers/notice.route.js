const express = require('express');
const router = express.Router();

const {NoticeController} = require('../controllers');

router.get('/', NoticeController.getAllNotice);
router.put('/', NoticeController.updateNotice);

module.exports = router;