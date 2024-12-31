const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.get('/', UserController.getAllUser); //done
router.get('/:id', UserController.getUserById); //done
router.post('/', UserController.createUser); //done
router.put('/:id', UserController.updateUser); //done
router.delete('/:id', UserController.deleteUser); 

module.exports = router;