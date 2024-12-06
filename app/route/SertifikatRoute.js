const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/OCRController');
const multer = require('multer');
const SertifikatController = require('../controllers/SertifikatController');
const upload = multer({
    dest: 'uploads/',
});

router.post('/recognize', upload.single('file'), ocrController.fileRecognize);

router.post('/', SertifikatController.createSertifikat);
router.get('/', SertifikatController.getAllSertifikat);
router.get('/:id', SertifikatController.getSertifikatById);

router.put('/:id', SertifikatController.updateUser);
router.delete('/:id', SertifikatController.deleteUser);

module.exports = router;