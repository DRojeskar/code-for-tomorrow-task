const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const serviceController = require('../controllers/serviceController');

router.post('/category/:categoryId/service', authMiddleware, serviceController.addService)

router.get('/category/:categoryId/services', authMiddleware, serviceController.getServices);

router.put('/category/:categoryId/service/:serviceId', authMiddleware, serviceController.updateService);


router.delete('/category/:categoryId/service/:serviceId', authMiddleware, serviceController.deleteService);

module.exports = router;
