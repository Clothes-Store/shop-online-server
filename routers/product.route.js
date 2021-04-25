const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/images'});
const router = express.Router();

const {ProductController} = require('../controllers');

router.get('/', ProductController.getAllProduct);
router.post('/',upload.array('images', 5), ProductController.createProduct);

module.exports = router;