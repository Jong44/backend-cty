const express = require('express');
const multer = require('multer');
const UploadController = require('../controllers/UploadController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload/photo', upload.single('photo'), UploadController.uploadPhoto);

module.exports = router;
