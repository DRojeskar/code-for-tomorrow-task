const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

router.post('/category', authMiddleware, categoryController.createCategory);


router.get('/categories', authMiddleware, categoryController.getAllCategories);


router.put('/category/:categoryId', authMiddleware, categoryController.updateCategory);
router.delete('/category/:categoryId', authMiddleware, categoryController.deleteCategory);

module.exports = router;
