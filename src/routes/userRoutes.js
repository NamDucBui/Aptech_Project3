const express = require('express');
const userController = require('../controllers/userController');    

const router = express.Router();

// Định nghĩa các route cho người dùng
router.post('/', userController.createUserHandler);
router.get('/', userController.getAllUsersHandler);
router.get('/:id', userController.getUserHandler);
router.put('/:id', userController.updateUserHandler);
router.delete('/:id', userController.deleteUserHandler);
router.get('/get/statistics', userController.getUserStatisticsHandler);
router.post('/login', userController.loginUserHandler);

module.exports = router; // Đảm bảo rằng bạn xuất router
