const express = require('express');
const DraftTransactionController = require('../controllers/TransaksiController');

const router = express.Router();


router.post('/', DraftTransactionController.createDraftTransaction);//done
router.get('/', DraftTransactionController.getAllDraftTransaction);//done
router.get('/:id', DraftTransactionController.getDraftTransactionById);//done
router.get('/user/:idUser', DraftTransactionController.getDraftTransactionByUserId);//done
router.delete('/:id', DraftTransactionController.deleteDraftTransaction);//done
router.post('/email', DraftTransactionController.getDraftTransactionByEmailAddress);//done

module.exports = router;
