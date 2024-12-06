const express = require('express');
const router = express.Router();
const SertifikatController = require('../controllers/SertifikatController');

router.post('/', SertifikatController.createSertifikat);
router.put('/:id', SertifikatController.updateUser);
router.delete('/:id', SertifikatController.deleteUser);

module.exports = router;