const express = require('express');
const router = express.Router();

const {ProvinceController} = require('../controllers');

router.get('/', ProvinceController.getProvincesByCity);

module.exports = router;