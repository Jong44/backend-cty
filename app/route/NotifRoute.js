const express = require('express');
const router = express.Router();
const NotifController = require('../controllers/NotifController');


router.get('/', NotifController.getAllNotif);
router.get('/:id', NotifController.getNotifById);
router.post('/', NotifController.createNotif);
router.put('/:id', NotifController.updateNotif);
router.delete('/:id', NotifController.deleteNotif);
router.get('/user/:idUser', NotifController.getNotifByIdUser);
router.post('/user/:idUser', NotifController.readAllNotifikasi);
router.delete('/:idUser', NotifController.deleteAllNotifikasi);

module.exports = router;