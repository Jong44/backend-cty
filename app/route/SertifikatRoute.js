const express = require('express');
const router = express.Router();
const SertifikatController = require('../controllers/SertifikatController');

router.post('/', SertifikatController.createSertifikat);
router.get('/', SertifikatController.getAllSertifikat);
router.get('/:id', SertifikatController.getSertifikatById);


module.exports = router;