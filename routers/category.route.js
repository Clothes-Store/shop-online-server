const express = require('express');
const router = express.Router();

const {CategoryController} = require('../controllers');

router.get('/', CategoryController.getAllCategory);
router.put('/', CategoryController.updateCategory);
router.delete('/', CategoryController.deleteById);
router.post('/', CategoryController.addNewCategory);

module.exports = router;