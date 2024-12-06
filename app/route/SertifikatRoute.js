const express = require('express');
const router = express.Router();
const SertifikatController = require('../controllers/SertifikatController');

router.post('/', SertifikatController.createSertifikat);

module.exports = router;