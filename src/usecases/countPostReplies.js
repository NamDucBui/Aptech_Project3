const PostRepository = require('../infrastructure/postRepository');

const countPostReplies = (postId, callback) => {
    PostRepository.countReplies(postId, (err, results) => {
        if (err) return callback(err);
        callback(null, results[0].reply_count);
    });
};

module.exports = countPostReplies; 