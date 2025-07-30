const express = require('express');
const configurationController = require('../controllers/configurationController');

const router = express.Router();

router.get('/:id', configurationController.getConfigurationHandler);
router.post('/', configurationController.createConfigurationHandler);

module.exports = router;