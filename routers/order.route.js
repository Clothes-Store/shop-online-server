const express = require('express');
const router = express.Router();

const {OrderController} = require('../controllers');
const {Auth} = require('../middlewares');

router.get('/all', OrderController.getAllOrder);
router.get('/:id', OrderController.getOrder);
router.post('/', OrderController.createOrder);

module.exports = router;