const express = require('express');
const router = express.Router();
const SertifikatController = require('../controllers/SertifikatController');
const OCRController = require('../controllers/OCRController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/ocr/sertifikat', upload.single('image'), OCRController.fileRecognizeSertifikat);
router.post('/ocr/ktp', upload.single('image'), OCRController.fileRecognizeKTP);

router.get('/count/:userId', SertifikatController.getCountSertifikatByUserId);
router.get('/history/:hash', SertifikatController.getHistoryOwnershipCertificate);

router.get('/hash/:hash', SertifikatController.getSertifikatByHash);

router.post('/', upload.fields([{ name: 'sertifikat', maxCount: 1 }, { name: 'ktp', maxCount: 1 }]), SertifikatController.createSertifikat);

router.get('/user/:userId', SertifikatController.getAllSertifikatByUserId);
router.post('/transaksi/create', SertifikatController.createTransactionCertificate);

module.exports = router;