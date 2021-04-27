const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/images'});
const router = express.Router();

const {UserController} = require('../controllers');

router.get('/all', UserController.getAllUser);
router.get('/static', UserController.getStaticUser);
router.get('/:id', UserController.getUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/:id', upload.array('images', 1), UserController.update);

module.exports = router;