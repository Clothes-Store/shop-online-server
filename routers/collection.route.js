const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/images'});
const router = express.Router();

const {CollectionController} = require('../controllers');

router.get('/', CollectionController.getAllCollection);
router.put('/', upload.array('banners', 5), CollectionController.updateCollection);
router.delete('/', CollectionController.deleteById);
router.post('/',  upload.array('banners', 5), CollectionController.addNewCollection);

module.exports = router;