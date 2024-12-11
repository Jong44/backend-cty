const express = require('express');
const router = express.Router();
const NodeController = require('../controllers/NodeController');


router.get('/', NodeController.getAllNode);
router.get('/:id', NodeController.getNodeById);
router.post('/', NodeController.createNode);
router.put('/:id', NodeController.updateNode);
router.delete('/:id', NodeController.deleteNode);

module.exports = router;