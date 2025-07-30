const express = require('express');
const ReplyController = require('../controllers/replyController'); // Import ReplyController

const router = express.Router();

// Định nghĩa các tuyến đường cho replies
router.post('/', ReplyController.createReplyHandler); // Tạo một reply mới
router.get('/posts/:postId', ReplyController.getRepliesForPostHandler); // Lấy tất cả replies cho một bài viết
router.get('/', ReplyController.getAllRepliesHandler); // Lấy tất cả replies
router.put('/:replyId', ReplyController.updateReplyHandler); // Cập nhật một reply theo ID
router.delete('/:replyId', ReplyController.deleteReplyHandler); // Xóa một reply theo ID

module.exports = router;