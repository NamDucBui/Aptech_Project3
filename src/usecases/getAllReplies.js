const Reply = require('../entities/reply');
const ReplyRepository = require('../infrastructure/replyRepository');

const getAllReplies = (callback) => {
    ReplyRepository.getAllReplies((err, results) => {
        if (err) return callback(err); // Xử lý lỗi nếu có

        // Tạo một mảng các đối tượng Reply từ kết quả
        const replies = results.map(result => new Reply(result));
        callback(null, replies); // Trả về mảng phản hồi
    });
};

module.exports = getAllReplies;

