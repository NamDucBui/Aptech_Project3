const ReplyRepository = require('../infrastructure/replyRepository'); // Import ReplyRepository

const getRepliesByPostId = (postId, callback) => {
    // Kiểm tra tính hợp lệ của postId
    if (!postId) {
        return callback(new Error("Missing post ID"));
    }

    // Gọi phương thức để lấy replies từ ReplyRepository
    ReplyRepository.getRepliesByPostId(postId, (err, results) => {
        if (err) {
            return callback(new Error("Failed to fetch replies: " + err.message)); // Xử lý lỗi nếu có
        }

        // Tạo mảng các đối tượng Reply từ kết quả
        const replies = results.map(result => new Reply(result));
        callback(null, replies); // Trả về mảng replies
    });
};

module.exports = getRepliesByPostId;