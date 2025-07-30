const Reply = require('../entities/reply');
const ReplyRepository = require('../infrastructure/replyRepository');

const createReply = (replyData, callback) => {
    const reply = new Reply(replyData);

    if (!reply.isValid()) {
        return callback(new Error("Invalid replyData"));
    }

    ReplyRepository.createReply(reply, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

module.exports = createReply;

