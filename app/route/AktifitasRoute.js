const express = require('express');
const router = express.Router();
const AktifitasController = require('../controllers/AktifiatsController');


router.get('/', AktifitasController.getAllAktifitas);
router.get('/:id', AktifitasController.getAktifitasById);
router.post('/', AktifitasController.createAktifitas);
router.put('/:id', AktifitasController.updateAktifitas);
router.delete('/:id', AktifitasController.deleteAktifitas);

module.exports = router;