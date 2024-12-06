const express=require('express')
const router=express.Router();
const ocrController = require('../controllers/OCRController');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/',
});

router.post('/recognize', upload.single('file'), ocrController.fileRecognize);

module.exports=router;