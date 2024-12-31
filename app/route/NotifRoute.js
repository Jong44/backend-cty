const express = require('express');
const router = express.Router();
const NotifController = require('../controllers/NotifController');


router.get('/', NotifController.getAllNotif); //done
router.get('/:id', NotifController.getNotifById); //done
router.post('/', NotifController.createNotif); //done
router.put('/:id', NotifController.updateNotif); //done
router.delete('/:id', NotifController.deleteNotif); //done
router.get('/user/:idUser', NotifController.getNotifByIdUser); //done
router.post('/user/:idUser', NotifController.readAllNotifikasi); //belom, kalo by id belom sabi
router.delete('/:idUser', NotifController.deleteAllNotifikasi); //done

module.exports = router;