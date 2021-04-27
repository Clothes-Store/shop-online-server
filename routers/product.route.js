const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/images'});
const router = express.Router();

const {ProductController} = require('../controllers');

router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductDetails);
router.delete('/:id', ProductController.deleteProduct);
router.post('/',upload.array('images', 5), ProductController.createProduct);
router.put('/:id',upload.array('images', 5), ProductController.updateProduct);

module.exports = router;