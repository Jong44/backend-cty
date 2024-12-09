const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/OCRController');
const multer = require('multer');
const SertifikatController = require('../controllers/SertifikatController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), SertifikatController.createSertifikat);
router.get('/', SertifikatController.getAllSertifikat);
router.get('/:id', SertifikatController.getSertifikatById);
router.put('/:id', SertifikatController.updateSertifikat);
router.delete('/:id', SertifikatController.deleteSertifikat);

module.exports = router;