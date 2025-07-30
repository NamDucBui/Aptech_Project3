const Reply = require('../entities/reply'); // Import Reply entity
const ReplyRepository = require('../infrastructure/replyRepository'); // Import ReplyRepository

const updateReply = (replyId, replyData, callback) => {
    // Tạo đối tượng Reply với dữ liệu được cung cấp
    const reply = new Reply({
        ...replyData,
        reply_id: replyId
    });

    // Debugging: Log thông tin reply để kiểm tra
    console.log('Reply being validated:', reply);

    // Kiểm tra tính hợp lệ của reply
    if (!reply.isValid()) {
        console.error('Validation failed for reply:', reply);
        return callback(new Error('Invalid reply data: ' + JSON.stringify(reply))); // Thêm chi tiết lỗi
    }

    // Gọi phương thức updateReply từ ReplyRepository
    ReplyRepository.updateReply(replyId, reply, (err, results) => {
        if (err) return callback(err); // Xử lý lỗi nếu có
        if (results.affectedRows > 0) {
            callback(null, 'Reply updated!'); // Trả về thông báo thành công
        } else {
            callback(new Error('Reply not found')); // Trả về lỗi nếu không tìm thấy reply
        }
    });
};

module.exports = updateReply;