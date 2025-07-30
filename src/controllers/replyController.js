const createReply = require('../usecases/createReply'); // Import createReply function
const getAllReplies = require('../usecases/getAllReplies'); // Import getAllReplies function
const updateReply = require('../usecases/updateReply'); // Import updateReply function
const deleteReply = require('../usecases/deleteReply'); // Import deleteReply function
const ReplyRepository = require('../infrastructure/replyRepository'); // 

const createReplyHandler = (req, res) => {
    const replyData = req.body; // Get reply data from request
    createReply(replyData, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message }); // Handle error if exists
        }
        res.status(201).json({ message: 'Reply created successfully!', data: replyData }); // Return success message
    });
};


// Lấy tất cả replies
const getAllRepliesHandler = (req, res) => {
    getAllReplies((err, replies) => {
        if (err) return res.status(500).send(err.message); // Handle error if exists
        res.json(replies); // Return the list of replies
    });
};


const updateReplyHandler = (req, res) => {
    const { replyId } = req.params; // Get replyId from URL parameters
    const replyData = req.body; // Get reply data from request
    updateReply(replyId, replyData, (err, message) => {
        if (err) return res.status(404).send(err.message); // Handle error if reply not found
        res.send(message); // Return success message
    });
};

const deleteReplyHandler = (req, res) => {
    const { replyId } = req.params; // Get replyId from URL parameters
    deleteReply(replyId, (err, message) => {
        if (err) return res.status(404).send(err.message); // Handle error if reply not found
        res.send(message); // Return success message
    });
};

const getRepliesForPostHandler = (req, res) => {
    const postId = req.params.postId; // Lấy postId từ tham số URL

    ReplyRepository.getReplyByPostId(postId, (err, replies) => {
        if (err) {
            return res.status(500).send(err.message); // Xử lý lỗi nếu có
        }

        // Kiểm tra nếu không có replies
        if (!replies || replies.length === 0) {
            return res.status(404).json({ message: 'No replies found for this post.' });
        }

        res.json(replies); // Trả về danh sách replies dưới dạng JSON
    });
};
module.exports = {
    createReplyHandler,
    getAllRepliesHandler, // Export getAllRepliesHandler
    updateReplyHandler,
    deleteReplyHandler,
    getRepliesForPostHandler
};