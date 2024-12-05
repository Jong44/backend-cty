const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', requireAuth, UserController.updateUser);
router.delete('/:id', requireAuth, UserController.deleteUser);

module.exports = router;