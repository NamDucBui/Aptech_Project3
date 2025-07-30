const ReplyRepository = require('../infrastructure/replyRepository'); // Import ReplyRepository

const deleteReply = (replyId, callback) => {
    ReplyRepository.deleteReply(replyId, (err, results) => {
        if (err) return callback(err); // Xử lý lỗi nếu có

        if (results.affectedRows > 0) {
            callback(null, 'Reply deleted!'); // Trả về thông báo thành công
        } else {
            callback(new Error('Reply not found')); // Trả về lỗi nếu không tìm thấy reply
        }
    });
};

module.exports = deleteReply;